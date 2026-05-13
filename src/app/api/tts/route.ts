import { NextRequest, NextResponse } from 'next/server'

// Singleton ZAI instance for reuse
let zaiInstance: any = null

async function getZAI() {
  if (!zaiInstance) {
    const ZAI = (await import('z-ai-web-dev-sdk')).default
    zaiInstance = await ZAI.create()
  }
  return zaiInstance
}

// Split text into chunks respecting sentence boundaries, max ~950 chars (buffer from 1024 limit)
function splitTextIntoChunks(text: string, maxLength = 950): string[] {
  const chunks: string[] = []
  // Try to split on sentence boundaries first
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]

  let currentChunk = ''
  for (const sentence of sentences) {
    if ((currentChunk + sentence).length <= maxLength) {
      currentChunk += sentence
    } else {
      if (currentChunk) chunks.push(currentChunk.trim())
      // If a single sentence is too long, split it further
      if (sentence.length > maxLength) {
        const words = sentence.split(' ')
        let wordChunk = ''
        for (const word of words) {
          if ((wordChunk + ' ' + word).length <= maxLength) {
            wordChunk = wordChunk ? wordChunk + ' ' + word : word
          } else {
            if (wordChunk) chunks.push(wordChunk.trim())
            wordChunk = word
          }
        }
        currentChunk = wordChunk
      } else {
        currentChunk = sentence
      }
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim())

  return chunks.filter(c => c.length > 0)
}

/**
 * Find the offset where PCM data starts in a WAV buffer.
 * WAV files have a RIFF header, then chunks. We look for the 'data' chunk.
 */
function findDataOffset(buf: Buffer): number {
  let offset = 12 // after RIFF header (RIFF + size + WAVE)
  while (offset < buf.length - 8) {
    const chunkId = buf.toString('ascii', offset, offset + 4)
    const chunkSize = buf.readUInt32LE(offset + 4)
    if (chunkId === 'data') {
      return offset + 8 // skip 'data' + size fields
    }
    offset += 8 + chunkSize
    // Align to even byte boundary (WAV spec)
    if (offset % 2 !== 0) offset++
  }
  // Fallback: standard 44-byte WAV header
  return 44
}

/**
 * Properly merge multiple WAV buffers into a single WAV file.
 * Extracts PCM data from each WAV, concatenates, and writes a new header.
 */
function mergeWavBuffers(buffers: Buffer[]): Buffer {
  if (buffers.length === 0) return Buffer.alloc(0)
  if (buffers.length === 1) return buffers[0]

  // Read audio format from the first WAV file's header
  const first = buffers[0]
  const numChannels = first.readUInt16LE(22)
  const sampleRate = first.readUInt32LE(24)
  const bitsPerSample = first.readUInt16LE(34)

  // Extract PCM data from each WAV (skip headers)
  const pcmChunks: Buffer[] = []
  let totalDataSize = 0

  for (const buf of buffers) {
    const dataOffset = findDataOffset(buf)
    const pcmData = buf.subarray(dataOffset)
    pcmChunks.push(pcmData)
    totalDataSize += pcmData.length
  }

  // Build new WAV file with combined PCM data
  const headerSize = 44
  const merged = Buffer.alloc(headerSize + totalDataSize)

  // RIFF header
  merged.write('RIFF', 0)
  merged.writeUInt32LE(36 + totalDataSize, 4) // file size - 8
  merged.write('WAVE', 8)

  // fmt sub-chunk
  merged.write('fmt ', 12)
  merged.writeUInt32LE(16, 16) // fmt chunk size
  merged.writeUInt16LE(1, 20) // PCM format
  merged.writeUInt16LE(numChannels, 22)
  merged.writeUInt32LE(sampleRate, 24)
  merged.writeUInt32LE(sampleRate * numChannels * (bitsPerSample / 8), 28) // byte rate
  merged.writeUInt16LE(numChannels * (bitsPerSample / 8), 32) // block align
  merged.writeUInt16LE(bitsPerSample, 34)

  // data sub-chunk
  merged.write('data', 36)
  merged.writeUInt32LE(totalDataSize, 40)

  // Copy PCM data
  let offset = headerSize
  for (const pcmData of pcmChunks) {
    pcmData.copy(merged, offset)
    offset += pcmData.length
  }

  return merged
}

export async function POST(req: NextRequest) {
  try {
    const { text, voice = 'jam', speed = 1.0 } = await req.json()

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    // Validate speed
    const validSpeed = Math.max(0.5, Math.min(2.0, Number(speed) || 1.0))

    const zai = await getZAI()

    // Split long text into chunks
    const chunks = splitTextIntoChunks(text.trim())

    if (chunks.length === 0) {
      return NextResponse.json({ error: 'No valid text to speak' }, { status: 400 })
    }

    // If only one chunk, return audio directly
    if (chunks.length === 1) {
      const response = await zai.audio.tts.create({
        input: chunks[0],
        voice,
        speed: validSpeed,
        response_format: 'wav',
        stream: false,
      })

      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(new Uint8Array(arrayBuffer))

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'audio/wav',
          'Content-Length': buffer.length.toString(),
          'Cache-Control': 'no-cache',
        },
      })
    }

    // For multiple chunks, generate audio for each and properly merge WAV data
    const audioBuffers: Buffer[] = []

    for (const chunk of chunks) {
      const response = await zai.audio.tts.create({
        input: chunk,
        voice,
        speed: validSpeed,
        response_format: 'wav',
        stream: false,
      })

      const arrayBuffer = await response.arrayBuffer()
      audioBuffers.push(Buffer.from(new Uint8Array(arrayBuffer)))
    }

    // Properly merge WAV files: extract PCM data from each, then build a new WAV
    const mergedBuffer = mergeWavBuffers(audioBuffers)

    return new NextResponse(mergedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': mergedBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    })
  } catch (error) {
    console.error('TTS API Error:', error)

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'TTS generation failed',
      },
      { status: 500 }
    )
  }
}
