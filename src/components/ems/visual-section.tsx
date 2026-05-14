'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { useAppStore } from '@/store/app-store'
import { useTranslation } from '@/hooks/use-translation'
import {
  ZoomIn, ZoomOut, Eye, EyeOff, Info, Heart, Wind, Activity,
  Download, Maximize2, X, Filter, Move, RotateCcw, MousePointer2,
  ChevronRight, Sparkles, Wrench, Search, ChevronLeft, XCircle,
  Scan, ImageIcon, LayoutGrid, Brain, CheckCircle2, AlertTriangle,
  ClipboardList, ArrowRight, Shield, Ruler, Weight, Gauge
} from 'lucide-react'

// ==================== ANATOMY DIAGRAMS ====================
interface AnatomyRegion {
  id: string
  name: string
  shortName: string
  description: string
  emsRelevance: string
  x: number
  y: number
  width: number
  height: number
  color: string // gradient color for this region
  icon?: string
}

const bodyRegions: AnatomyRegion[] = [
  { id: 'head', name: 'Head / Cranium', shortName: 'Head', description: 'Contains the brain, protected by the skull', emsRelevance: 'Assess for head trauma, signs of concussion, skull fractures. Check pupil response (GCS)', x: 38, y: 2, width: 24, height: 12, color: '#6366F1' },
  { id: 'neck', name: 'Neck / Cervical Spine', shortName: 'Neck', description: '7 cervical vertebrae protecting the spinal cord', emsRelevance: 'Cervical spine stabilization is critical in trauma. Never remove helmet without proper technique', x: 40, y: 14, width: 20, height: 8, color: '#8B5CF6' },
  { id: 'chest', name: 'Chest / Thorax', shortName: 'Chest', description: 'Contains heart, lungs, major vessels', emsRelevance: 'Assess for chest injuries: flail chest, tension pneumothorax, cardiac tamponade', x: 32, y: 22, width: 36, height: 18, color: '#3B82F6' },
  { id: 'heart', name: 'Heart', shortName: 'Heart', description: '4-chamber pump circulating blood', emsRelevance: 'CPR compressions target area. AED pad placement. Assess for MI symptoms', x: 40, y: 26, width: 16, height: 10, color: '#EF4444' },
  { id: 'abdomen', name: 'Abdomen', shortName: 'Abdomen', description: 'Contains digestive organs, spleen, liver, kidneys', emsRelevance: 'Assess for evisceration, internal bleeding, referred pain. LUQ = spleen, RUQ = liver', x: 32, y: 40, width: 36, height: 14, color: '#F59E0B' },
  { id: 'pelvis', name: 'Pelvis', shortName: 'Pelvis', description: 'Hip bones, bladder, reproductive organs', emsRelevance: 'Assess for pelvic fractures (do NOT compress). Major vascular injury risk', x: 34, y: 54, width: 32, height: 8, color: '#EC4899' },
  { id: 'left-arm', name: 'Left Upper Extremity', shortName: 'L. Arm', description: 'Humerus, radius, ulna, brachial artery', emsRelevance: 'Check distal pulse (radial). Splinting fractures. Blood pressure measurement', x: 10, y: 24, width: 18, height: 30, color: '#10B981' },
  { id: 'right-arm', name: 'Right Upper Extremity', shortName: 'R. Arm', description: 'Humerus, radius, ulna, brachial artery', emsRelevance: 'IV access site. Tourniquet application for hemorrhage control', x: 72, y: 24, width: 18, height: 30, color: '#10B981' },
  { id: 'left-leg', name: 'Left Lower Extremity', shortName: 'L. Leg', description: 'Femur, tibia, fibula, femoral artery', emsRelevance: 'Femur fractures can cause 1-2L blood loss. Traction splinting. Check distal pulse (dorsalis pedis)', x: 34, y: 62, width: 14, height: 30, color: '#06B6D4' },
  { id: 'right-leg', name: 'Right Lower Extremity', shortName: 'R. Leg', description: 'Femur, tibia, fibula, femoral artery', emsRelevance: 'Same assessment as left. Compare bilateral findings. Long bone injuries in MCI', x: 52, y: 62, width: 14, height: 30, color: '#06B6D4' },
]

const heartRegions: AnatomyRegion[] = [
  { id: 'ra', name: 'Right Atrium', shortName: 'RA', description: 'Receives deoxygenated blood from vena cava', emsRelevance: 'Central venous pressure assessment. Pacemaker lead placement', x: 35, y: 20, width: 20, height: 18, color: '#60A5FA' },
  { id: 'rv', name: 'Right Ventricle', shortName: 'RV', description: 'Pumps blood to lungs via pulmonary artery', emsRelevance: 'Right-sided heart failure. Cor pulmonale in COPD', x: 30, y: 45, width: 25, height: 25, color: '#3B82F6' },
  { id: 'la', name: 'Left Atrium', shortName: 'LA', description: 'Receives oxygenated blood from pulmonary veins', emsRelevance: 'Atrial fibrillation origin. Mitral valve assessment', x: 55, y: 20, width: 20, height: 18, color: '#F87171' },
  { id: 'lv', name: 'Left Ventricle', shortName: 'LV', description: 'Pumps oxygenated blood to body via aorta', emsRelevance: 'MI most commonly affects LAD territory. Heart failure. CPR force target', x: 50, y: 45, width: 25, height: 25, color: '#EF4444' },
  { id: 'aorta', name: 'Aorta', shortName: 'Aorta', description: 'Main artery carrying oxygenated blood from heart', emsRelevance: 'Aortic dissection - tearing chest pain. Aortic aneurysm. Blood pressure differential', x: 50, y: 5, width: 15, height: 15, color: '#F59E0B' },
  { id: 'svc', name: 'Superior Vena Cava', shortName: 'SVC', description: 'Returns blood from upper body to right atrium', emsRelevance: 'Central line placement. SVC syndrome', x: 35, y: 5, width: 12, height: 15, color: '#8B5CF6' },
]

const airwayRegions: AnatomyRegion[] = [
  { id: 'nose', name: 'Nasal Cavity', shortName: 'Nose', description: 'Warms, humidifies, and filters air', emsRelevance: 'Nasopharyngeal airway (NPA) insertion route. Epistaxis management', x: 30, y: 5, width: 20, height: 12, color: '#8B5CF6' },
  { id: 'oropharynx', name: 'Oropharynx', shortName: 'Oral', description: 'Oral passage to the throat', emsRelevance: 'Oropharyngeal airway (OPA) insertion. Suctioning. Jaw thrust maneuver', x: 35, y: 18, width: 30, height: 10, color: '#3B82F6' },
  { id: 'larynx', name: 'Larynx (Voice Box)', shortName: 'Larynx', description: 'Contains vocal cords, protects airway', emsRelevance: 'Cricothyroidotomy site. Vocal cord assessment. Intubation landmark', x: 40, y: 28, width: 20, height: 12, color: '#EF4444' },
  { id: 'trachea', name: 'Trachea', shortName: 'Trachea', description: 'Windpipe carrying air to bronchi', emsRelevance: 'Endotracheal tube placement. Tracheal deviation = tension pneumothorax', x: 42, y: 40, width: 16, height: 18, color: '#10B981' },
  { id: 'bronchi', name: 'Bronchi', shortName: 'Bronchi', description: 'Branches of trachea to each lung', emsRelevance: 'Right mainstem intubation (more common). Foreign body aspiration', x: 30, y: 58, width: 40, height: 10, color: '#F59E0B' },
  { id: 'lungs', name: 'Lungs', shortName: 'Lungs', description: 'Gas exchange organs (alveoli)', emsRelevance: 'Auscultation sites. Pneumothorax, hemothorax assessment. BVM ventilation', x: 15, y: 68, width: 70, height: 25, color: '#06B6D4' },
]

const pulseRegions: AnatomyRegion[] = [
  { id: 'temporal', name: 'Temporal Pulse', shortName: 'Temporal', description: 'Superficial temporal artery, located at the temple area just in front of the ear', emsRelevance: 'Assess in heat stroke, severe headache, or when other pulses are not palpable. Can indicate carotid artery health', x: 34, y: 4, width: 12, height: 8, color: '#EF4444' },
  { id: 'carotid', name: 'Carotid Pulse', shortName: 'Carotid', description: 'Common carotid artery, located in the neck lateral to the trachea', emsRelevance: 'CRITICAL pulse point. Central pulse used in CPR to assess circulation. Strongest pulse in cardiac arrest assessment. Never palpate both sides simultaneously', x: 55, y: 14, width: 12, height: 8, color: '#DC2626' },
  { id: 'apical', name: 'Apical Pulse', shortName: 'Apical', description: 'Located at the 5th intercostal space, left midclavicular line — the apex of the heart', emsRelevance: 'Most accurate pulse for heart rate assessment. Auscultated with stethoscope. Used for infant HR, medication monitoring', x: 40, y: 28, width: 14, height: 8, color: '#F43F5E' },
  { id: 'brachial', name: 'Brachial Pulse', shortName: 'Brachial', description: 'Brachial artery, located on the medial aspect of the upper arm', emsRelevance: 'Primary pulse check site for infants. Used for blood pressure measurement. IV access nearby', x: 12, y: 28, width: 12, height: 8, color: '#F97316' },
  { id: 'radial', name: 'Radial Pulse', shortName: 'Radial', description: 'Radial artery, located at the wrist on the thumb side', emsRelevance: 'Most commonly assessed peripheral pulse. Indicates adequate systolic BP (>80 mmHg). Used for HR and rhythm assessment', x: 8, y: 46, width: 12, height: 8, color: '#FB923C' },
  { id: 'femoral', name: 'Femoral Pulse', shortName: 'Femoral', description: 'Femoral artery, located in the groin below the inguinal ligament', emsRelevance: 'Central pulse used in CPR for children. Indicates aortic valve competence. Major hemorrhage control site (pulse point compression)', x: 38, y: 56, width: 12, height: 8, color: '#E11D48' },
  { id: 'popliteal', name: 'Popliteal Pulse', shortName: 'Popliteal', description: 'Popliteal artery, located behind the knee in the popliteal fossa', emsRelevance: 'Difficult to palpate but indicates femoral artery patency. Used for BP measurement in thigh. Assessed in lower extremity vascular disease', x: 40, y: 72, width: 12, height: 8, color: '#BE185D' },
  { id: 'post-tibial', name: 'Posterior Tibial Pulse', shortName: 'Post. Tibial', description: 'Posterior tibial artery, located behind the medial malleolus (ankle)', emsRelevance: 'Assesses lower extremity perfusion. Important in diabetic foot assessment. Absence indicates peripheral vascular disease', x: 34, y: 86, width: 14, height: 8, color: '#A855F7' },
  { id: 'dorsalis-pedis', name: 'Dorsalis Pedis Pulse', shortName: 'D. Pedis', description: 'Dorsalis pedis artery, located on the top of the foot', emsRelevance: 'Assesses distal lower extremity perfusion. Check after leg injury/surgery. Absent pulse may indicate arterial occlusion. Compare bilateral', x: 48, y: 92, width: 14, height: 8, color: '#7C3AED' },
]

const brainRegions: AnatomyRegion[] = [
  { id: 'frontal', name: 'Frontal Lobe', shortName: 'Frontal', description: 'Largest lobe, controls executive functions, motor skills, speech production (Broca\'s area), and personality', emsRelevance: 'Head trauma here affects behavior and motor control. GCS assessment of verbal/motor response. Frontal lobe injury = personality changes, poor judgment', x: 12, y: 18, width: 28, height: 24, color: '#6366F1' },
  { id: 'parietal', name: 'Parietal Lobe', shortName: 'Parietal', description: 'Processes sensory information, spatial awareness, and navigation. Contains primary somatosensory cortex', emsRelevance: 'Injury causes sensory loss, neglect syndrome. Stroke here = contralateral sensory deficits. Assess with light touch and pain response', x: 42, y: 12, width: 22, height: 20, color: '#3B82F6' },
  { id: 'temporal', name: 'Temporal Lobe', shortName: 'Temporal', description: 'Processes auditory information, memory formation (hippocampus), and language comprehension (Wernicke\'s area)', emsRelevance: 'Head trauma can cause hearing loss, memory problems. Temporal lobe seizures mimic psychiatric conditions. Basilar skull fracture signs: Battle sign, raccoon eyes', x: 14, y: 48, width: 24, height: 18, color: '#10B981' },
  { id: 'occipital', name: 'Occipital Lobe', shortName: 'Occipital', description: 'Primary visual processing center, interprets visual stimuli from the eyes', emsRelevance: 'Injury causes visual field deficits, cortical blindness. Stroke here = homonymous hemianopsia. Assess pupillary response', x: 68, y: 20, width: 20, height: 18, color: '#F59E0B' },
  { id: 'cerebellum', name: 'Cerebellum', shortName: 'Cerebellum', description: 'Coordinates voluntary movement, balance, posture, and motor learning. Contains more neurons than the rest of the brain combined', emsRelevance: 'Ataxia and loss of coordination suggest cerebellar injury. Assess with finger-to-nose, heel-to-shin tests. Important in stroke and head trauma assessment', x: 66, y: 44, width: 22, height: 16, color: '#EF4444' },
  { id: 'brainstem', name: 'Brain Stem', shortName: 'Brainstem', description: 'Controls vital autonomic functions: breathing, heart rate, blood pressure, consciousness. Contains midbrain, pons, medulla oblongata', emsRelevance: 'MOST CRITICAL brain area. Controls respiratory and cardiac centers. Brainstem herniation = fatal. GCS assesses brainstem function. Abnormal respiratory patterns indicate brainstem injury', x: 54, y: 62, width: 18, height: 28, color: '#EC4899' },
  { id: 'diencephalon', name: 'Diencephalon (Thalamus/Hypothalamus)', shortName: 'Thalamus', description: 'Thalamus: relay station for sensory signals. Hypothalamus: regulates temperature, hunger, hormones, autonomic nervous system', emsRelevance: 'Hypothalamic injury = temperature dysregulation (poikilothermia). Thalamic injury = severe pain syndromes. Diabetes insipidus after TBI = hypothalamic dysfunction', x: 40, y: 34, width: 18, height: 14, color: '#8B5CF6' },
]

type DiagramType = 'body' | 'heart' | 'airway' | 'pulse' | 'brain'

// ==================== SVG Gradient Definitions ====================
function SvgDefs() {
  return (
    <defs>
      {/* Soft shadow filter */}
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.1" />
      </filter>
      {/* Glow filter for selected/hovered regions */}
      <filter id="regionGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.18  0 0 0 0 0.77  0 0 0 0 0.71  0 0 0 0.4 0" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Subtle inner glow for body outlines */}
      <filter id="innerGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
        <feOffset dx="0" dy="0" />
        <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feFlood floodColor="#2EC4B6" floodOpacity="0.15" />
        <feComposite in2="SourceAlpha" operator="in" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode />
        </feMerge>
      </filter>
      {/* Gradients for body outline */}
      <linearGradient id="bodyOutlineGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#64748B" stopOpacity="0.08" />
      </linearGradient>
      <linearGradient id="bodyStrokeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#64748B" stopOpacity="0.3" />
      </linearGradient>
      {/* Heart gradient - soft, not intense */}
      <radialGradient id="heartFillGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FECACA" stopOpacity="0.4" />
        <stop offset="70%" stopColor="#FCA5A5" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#F87171" stopOpacity="0.1" />
      </radialGradient>
      <linearGradient id="heartStrokeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F87171" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#EF4444" stopOpacity="0.4" />
      </linearGradient>
      {/* Airway gradient */}
      <linearGradient id="airwayFillGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.08" />
      </linearGradient>
      <linearGradient id="airwayStrokeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
      </linearGradient>
      {/* Label background gradient */}
      <linearGradient id="labelBgGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="white" stopOpacity="0.92" />
        <stop offset="100%" stopColor="white" stopOpacity="0.85" />
      </linearGradient>
      {/* Dark mode label background */}
      <linearGradient id="labelBgGradDark" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1E293B" stopOpacity="0.92" />
        <stop offset="100%" stopColor="#0F172A" stopOpacity="0.88" />
      </linearGradient>
      {/* Pulse body outline - warm red/pink gradient */}
      <linearGradient id="pulseOutlineGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FCA5A5" stopOpacity="0.18" />
        <stop offset="50%" stopColor="#F87171" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#EF4444" stopOpacity="0.06" />
      </linearGradient>
      <linearGradient id="pulseStrokeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F87171" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#DC2626" stopOpacity="0.35" />
      </linearGradient>
      {/* Brain outline gradient */}
      <linearGradient id="brainFillGrad" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.06" />
      </linearGradient>
      <linearGradient id="brainStrokeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.35" />
      </linearGradient>
      {/* Pulse point glow filter */}
      <filter id="pulseGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0.94  0 0 0 0 0.27  0 0 0 0 0.27  0 0 0 0.5 0" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Brain subtle shadow filter */}
      <filter id="brainShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#7C3AED" floodOpacity="0.12" />
      </filter>
      {/* Body radial background glow */}
      <radialGradient id="bodyBgGlow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
      </radialGradient>
      {/* Enhanced heart fill gradient with more color stops */}
      <radialGradient id="heartFillGradRich" cx="45%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#FEE2E2" stopOpacity="0.45" />
        <stop offset="30%" stopColor="#FECACA" stopOpacity="0.35" />
        <stop offset="60%" stopColor="#FCA5A5" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#F87171" stopOpacity="0.08" />
      </radialGradient>
      <linearGradient id="heartStrokeGradRich" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#FB7185" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#E11D48" stopOpacity="0.3" />
      </linearGradient>
      {/* Blood flow gradient - oxygenated (red) */}
      <linearGradient id="oxyBloodGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#DC2626" stopOpacity="0.4" />
      </linearGradient>
      {/* Blood flow gradient - deoxygenated (blue) */}
      <linearGradient id="deoxyBloodGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.4" />
      </linearGradient>
      {/* Enhanced airway fill gradient */}
      <linearGradient id="airwayFillGradRich" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.25" />
        <stop offset="40%" stopColor="#BFDBFE" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.06" />
      </linearGradient>
      <linearGradient id="airwayStrokeGradRich" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.35" />
      </linearGradient>
      {/* Pulse body radial background glow */}
      <radialGradient id="pulseBgGlow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stopColor="#EF4444" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
      </radialGradient>
      {/* Brain radial background glow */}
      <radialGradient id="brainBgGlow" cx="40%" cy="35%" r="45%">
        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.06" />
        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
      </radialGradient>
    </defs>
  )
}

// ==================== Interactive Diagram Component ====================
function InteractiveDiagram({ type }: { type: DiagramType }) {
  const [selectedRegion, setSelectedRegion] = useState<AnatomyRegion | null>(null)
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [zoom, setZoom] = useState(1)
  const [showLabels, setShowLabels] = useState(true)
  const [isPanning, setIsPanning] = useState(false)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const { settings } = useAppStore()
  const isDark = settings.theme === 'dark'

  const regions = type === 'body' ? bodyRegions : type === 'heart' ? heartRegions : type === 'airway' ? airwayRegions : type === 'pulse' ? pulseRegions : brainRegions
  const title = type === 'body' ? 'Human Body (Anterior View)' : type === 'heart' ? 'Heart Anatomy' : type === 'airway' ? 'Airway Anatomy' : type === 'pulse' ? '9 Pulse Points' : 'Brain Anatomy (Lateral View)'
  const icon = type === 'body' ? <Activity className="w-5 h-5" /> : type === 'heart' ? <Heart className="w-5 h-5" /> : type === 'airway' ? <Wind className="w-5 h-5" /> : type === 'pulse' ? <Activity className="w-5 h-5" /> : <Brain className="w-5 h-5" />

  // Pan handlers
  const handlePanStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (zoom <= 1) return
    setIsPanning(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setPanStart({ x: clientX - panOffset.x, y: clientY - panOffset.y })
  }, [zoom, panOffset])

  const handlePanMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isPanning) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setPanOffset({ x: clientX - panStart.x, y: clientY - panStart.y })
  }, [isPanning, panStart])

  const handlePanEnd = useCallback(() => {
    setIsPanning(false)
  }, [])

  const resetView = useCallback(() => {
    setZoom(1)
    setPanOffset({ x: 0, y: 0 })
  }, [])

  // Compute effective pan offset (reset when zoom <= 1)
  const effectivePanOffset = zoom <= 1 ? { x: 0, y: 0 } : panOffset

  // Get region color with opacity
  const getRegionFill = (region: AnatomyRegion, isSelected: boolean, isHovered: boolean) => {
    const baseOpacity = isSelected ? 0.35 : isHovered ? 0.25 : 0.12
    const color = region.color
    // Convert hex to rgba
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${baseOpacity})`
  }

  const getRegionStroke = (region: AnatomyRegion, isSelected: boolean, isHovered: boolean) => {
    const opacity = isSelected ? 0.9 : isHovered ? 0.7 : 0.4
    const color = region.color
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
            className="h-8 w-8 p-0"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
          <span className="text-xs text-muted-foreground min-w-[48px] text-center font-medium tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.min(3, zoom + 0.25))}
            className="h-8 w-8 p-0"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>
          <div className="w-px h-5 bg-border mx-1" />
          <Button
            variant="outline"
            size="sm"
            onClick={resetView}
            className="h-8 gap-1.5 text-xs"
            title="Reset View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
          {zoom > 1 && (
            <span className="text-[10px] text-muted-foreground flex items-center gap-1 ml-1">
              <Move className="w-3 h-3" /> Drag to pan
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLabels(!showLabels)}
            className="h-8 gap-1.5 text-xs"
          >
            {showLabels ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showLabels ? 'Hide' : 'Show'} Labels
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Diagram */}
        <div className="md:col-span-1 lg:col-span-2">
          <Card className="overflow-hidden border-border/60">
            <CardContent className="p-0">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 bg-muted/20">
                <div className="p-1 rounded-md bg-primary/10 text-primary">
                  {icon}
                </div>
                <h3 className="font-semibold text-sm">{title}</h3>
                <div className="ml-auto flex items-center gap-1">
                  <span className="text-[10px] text-muted-foreground">
                    {regions.length} regions
                  </span>
                </div>
              </div>
              {/* SVG Container */}
              <div
                ref={svgContainerRef}
                className={cn(
                  'relative overflow-hidden bg-gradient-to-b from-muted/20 to-muted/5 min-h-[320px] sm:min-h-[420px]',
                  isPanning ? 'cursor-grabbing' : zoom > 1 ? 'cursor-grab' : 'cursor-default'
                )}
                onMouseDown={handlePanStart}
                onMouseMove={handlePanMove}
                onMouseUp={handlePanEnd}
                onMouseLeave={handlePanEnd}
                onTouchStart={handlePanStart}
                onTouchMove={handlePanMove}
                onTouchEnd={handlePanEnd}
              >
                <svg
                  viewBox="0 0 100 100"
                  className="w-full svg-diagram-root"
                  style={{
                    transform: `scale(${zoom}) translate(${effectivePanOffset.x / zoom}px, ${effectivePanOffset.y / zoom}px)`,
                    transformOrigin: 'top left',
                    minWidth: '260px',
                    transition: isPanning ? 'none' : 'transform 0.2s ease-out',
                  }}
                >
                  <SvgDefs />

                  {/* CSS animation for pulse points */}
                  <style>{`
                    @keyframes pulseRing {
                      0% { r: 1.5; opacity: 0.8; }
                      100% { r: 4; opacity: 0; }
                    }
                    @keyframes heartbeat {
                      0%, 100% { opacity: 0.6; }
                      50% { opacity: 1; }
                    }
                    .pulse-ring-anim {
                      animation: pulseRing 1.5s ease-out infinite;
                    }
                    .heartbeat-anim {
                      animation: heartbeat 1.2s ease-in-out infinite;
                    }
                  `}</style>

                  {/* Background body outline */}
                  {type === 'body' && (
                    <g filter="url(#softShadow)">
                      {/* Radial background glow */}
                      <circle cx="50" cy="38" r="35" fill="url(#bodyBgGlow)" />
                      {/* Head - more anatomical with jaw line */}
                      <path
                        d="M38 4 Q38 0 50 0 Q62 0 62 4 L62 10 Q62 16 56 16 L54 16 Q52 18 50 18 Q48 18 46 16 L44 16 Q38 16 38 10 Z"
                        fill="url(#bodyOutlineGrad)"
                        stroke="url(#bodyStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Neck with slight trapezoid suggestion */}
                      <path
                        d="M44 16 L44 19 Q44 20 42 20 L38 20 Q36 20 35 19 L34 18 M56 16 L56 19 Q56 20 58 20 L62 20 Q64 20 65 19 L66 18"
                        fill="none"
                        stroke="url(#bodyStrokeGrad)"
                        strokeWidth="0.35"
                      />
                      {/* Shoulders with natural curves */}
                      <path
                        d="M35 20 Q30 20 26 23 L22 27 Q20 29 20 31"
                        fill="none"
                        stroke="url(#bodyStrokeGrad)"
                        strokeWidth="0.35"
                      />
                      <path
                        d="M65 20 Q70 20 74 23 L78 27 Q80 29 80 31"
                        fill="none"
                        stroke="url(#bodyStrokeGrad)"
                        strokeWidth="0.35"
                      />
                      {/* Torso with natural taper */}
                      <path
                        d="M30 20 Q30 19 34 19 L66 19 Q70 19 70 20 L71 38 Q71 50 69 55 Q68 58 66 58 L34 58 Q32 58 31 55 Q29 50 29 38 Z"
                        fill="url(#bodyOutlineGrad)"
                        stroke="url(#bodyStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Left arm with shoulder curve, elbow, hand */}
                      <path
                        d="M30 22 Q28 21 26 23 L20 31 Q18 33 17 36 L12 44 Q10 47 10 50 L10 56 Q10 58 11 59 Q12 60 14 60 L16 60 Q18 60 18 58 L18 54 L20 44 L26 34 L30 28"
                        fill="url(#bodyOutlineGrad)"
                        stroke="url(#bodyStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Right arm */}
                      <path
                        d="M70 22 Q72 21 74 23 L80 31 Q82 33 83 36 L88 44 Q90 47 90 50 L90 56 Q90 58 89 59 Q88 60 86 60 L84 60 Q82 60 82 58 L82 54 L80 44 L74 34 L70 28"
                        fill="url(#bodyOutlineGrad)"
                        stroke="url(#bodyStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Left leg with natural taper and foot */}
                      <path
                        d="M32 58 L32 62 L34 62 L34 88 Q34 90 34 92 L34 94 Q34 96 36 96 L42 96 Q44 96 44 94 Q44 92 44 90 L44 62 L48 62 L48 58"
                        fill="url(#bodyOutlineGrad)"
                        stroke="url(#bodyStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Left foot suggestion */}
                      <path
                        d="M34 94 Q34 96 30 96 L28 95 Q26 94 28 93 L34 92"
                        fill="url(#bodyOutlineGrad)"
                        stroke="url(#bodyStrokeGrad)"
                        strokeWidth="0.3"
                      />
                      {/* Right leg */}
                      <path
                        d="M52 58 L52 62 L54 62 L54 88 Q54 90 54 92 L54 94 Q54 96 56 96 L62 96 Q64 96 64 94 Q64 92 64 90 L64 62 L68 62 L68 58"
                        fill="url(#bodyOutlineGrad)"
                        stroke="url(#bodyStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Right foot suggestion */}
                      <path
                        d="M64 94 Q64 96 68 96 L70 95 Q72 94 70 93 L64 92"
                        fill="url(#bodyOutlineGrad)"
                        stroke="url(#bodyStrokeGrad)"
                        strokeWidth="0.3"
                      />
                      {/* Center line (sternum) */}
                      <line x1="50" y1="19" x2="50" y2="58" stroke="#94A3B8" strokeWidth="0.15" strokeDasharray="1 1" opacity="0.3" />
                      {/* Clavicle suggestions */}
                      <path d="M38 21 Q42 20 50 20 Q58 20 62 21" fill="none" stroke="#94A3B8" strokeWidth="0.12" opacity="0.25" />
                      {/* Sternum line */}
                      <line x1="50" y1="22" x2="50" y2="38" stroke="#94A3B8" strokeWidth="0.12" strokeDasharray="0.8 0.8" opacity="0.2" />
                      {/* Rib suggestions */}
                      <path d="M38 26 Q44 24 50 24" fill="none" stroke="#94A3B8" strokeWidth="0.1" opacity="0.15" />
                      <path d="M50 24 Q56 24 62 26" fill="none" stroke="#94A3B8" strokeWidth="0.1" opacity="0.15" />
                      <path d="M36 30 Q43 28 50 28" fill="none" stroke="#94A3B8" strokeWidth="0.1" opacity="0.15" />
                      <path d="M50 28 Q57 28 64 30" fill="none" stroke="#94A3B8" strokeWidth="0.1" opacity="0.15" />
                      <path d="M35 34 Q43 32 50 32" fill="none" stroke="#94A3B8" strokeWidth="0.1" opacity="0.15" />
                      <path d="M50 32 Q57 32 65 34" fill="none" stroke="#94A3B8" strokeWidth="0.1" opacity="0.15" />
                      {/* Navel suggestion */}
                      <circle cx="50" cy="44" r="0.6" fill="none" stroke="#94A3B8" strokeWidth="0.1" opacity="0.2" />
                      {/* Double-line effect on torso outline */}
                      <path
                        d="M31 22 Q31 20 35 20 L65 20 Q69 20 69 22"
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="0.1"
                        opacity="0.15"
                      />
                    </g>
                  )}

                  {type === 'heart' && (
                    <g filter="url(#softShadow)">
                      {/* Heart shape - anatomically correct, slightly asymmetric */}
                      <path
                        d="M50 95 Q16 70 18 40 Q18 24 32 14 Q42 8 50 12 Q58 8 68 14 Q82 24 82 40 Q84 70 50 95Z"
                        fill="url(#heartFillGradRich)"
                        stroke="url(#heartStrokeGradRich)"
                        strokeWidth="0.55"
                      />
                      {/* Inner heart shadow for depth */}
                      <path
                        d="M50 90 Q22 68 24 42 Q24 28 36 18 Q44 12 50 16 Q56 12 64 18 Q76 28 76 42 Q78 68 50 90Z"
                        fill="none"
                        stroke="#FCA5A5"
                        strokeWidth="0.12"
                        opacity="0.3"
                      />
                      {/* Septum line (dividing left/right) */}
                      <line x1="50" y1="18" x2="50" y2="88" stroke="#F87171" strokeWidth="0.2" strokeDasharray="1.5 1" opacity="0.35" />
                      {/* AV plane line (dividing atria/ventricles) */}
                      <line x1="25" y1="42" x2="75" y2="42" stroke="#F87171" strokeWidth="0.2" strokeDasharray="1.5 1" opacity="0.35" />
                      {/* Valve positions - 4 diamond shapes */}
                      {/* Tricuspid valve (right AV) */}
                      <path d="M44 40 L46 38 L48 40 L46 42 Z" fill="#F87171" opacity="0.5" />
                      {/* Mitral valve (left AV) */}
                      <path d="M52 40 L54 38 L56 40 L54 42 Z" fill="#EF4444" opacity="0.5" />
                      {/* Pulmonary valve */}
                      <path d="M40 22 L42 20 L44 22 L42 24 Z" fill="#60A5FA" opacity="0.4" />
                      {/* Aortic valve */}
                      <path d="M56 22 L58 20 L60 22 L58 24 Z" fill="#F59E0B" opacity="0.4" />
                      {/* Coronary artery suggestions */}
                      <path d="M50 30 Q44 34 40 42 Q38 48 42 56" fill="none" stroke="#F87171" strokeWidth="0.15" opacity="0.3" />
                      <path d="M50 30 Q56 34 60 42 Q62 48 58 56" fill="none" stroke="#F87171" strokeWidth="0.15" opacity="0.3" />
                      <path d="M42 56 Q44 62 48 68 Q50 72 50 76" fill="none" stroke="#F87171" strokeWidth="0.12" opacity="0.2" />
                      <path d="M58 56 Q56 62 52 68 Q50 72 50 76" fill="none" stroke="#F87171" strokeWidth="0.12" opacity="0.2" />
                      {/* Blood flow arrows - deoxygenated (blue) into right side */}
                      <path d="M30 8 L36 14" fill="none" stroke="url(#deoxyBloodGrad)" strokeWidth="0.3" markerEnd="url(#arrowBlue)" />
                      <path d="M36 14 L42 22" fill="none" stroke="url(#deoxyBloodGrad)" strokeWidth="0.25" opacity="0.6" />
                      {/* Blood flow arrows - oxygenated (red) from left side */}
                      <path d="M58 22 L62 14" fill="none" stroke="url(#oxyBloodGrad)" strokeWidth="0.25" opacity="0.6" />
                      <path d="M62 14 L70 8" fill="none" stroke="url(#oxyBloodGrad)" strokeWidth="0.3" />
                      {/* Small arrowheads for blood flow */}
                      <polygon points="36,14 34,12 38,12" fill="#60A5FA" opacity="0.5" />
                      <polygon points="70,8 68,6 72,6" fill="#EF4444" opacity="0.5" />
                    </g>
                  )}

                  {type === 'airway' && (
                    <g filter="url(#softShadow)">
                      {/* Nasal cavity - wider at top */}
                      <path
                        d="M42 2 Q38 2 36 4 L34 8 Q32 12 36 14 L40 14 Q42 14 44 12 L44 6 Q44 2 42 2Z"
                        fill="url(#airwayFillGradRich)"
                        stroke="url(#airwayStrokeGradRich)"
                        strokeWidth="0.35"
                      />
                      {/* Oral cavity / Pharynx - wider passage */}
                      <path
                        d="M36 14 Q32 14 32 18 L32 22 Q32 26 36 28 L44 30 Q48 32 50 32 Q52 32 56 30 L64 28 Q68 26 68 22 L68 18 Q68 14 64 14 L56 14 Q52 14 50 14 Q48 14 44 14 Z"
                        fill="url(#airwayFillGradRich)"
                        stroke="url(#airwayStrokeGradRich)"
                        strokeWidth="0.35"
                      />
                      {/* Larynx - narrowing with vocal cord suggestion */}
                      <path
                        d="M44 30 Q42 30 42 32 L42 36 Q42 38 44 38 L56 38 Q58 38 58 36 L58 32 Q58 30 56 30 Z"
                        fill="url(#airwayFillGradRich)"
                        stroke="url(#airwayStrokeGradRich)"
                        strokeWidth="0.35"
                      />
                      {/* Vocal cords suggestion */}
                      <line x1="44" y1="34" x2="56" y2="34" stroke="#EF4444" strokeWidth="0.15" strokeDasharray="1 0.5" opacity="0.35" />
                      <line x1="46" y1="33" x2="54" y2="33" stroke="#EF4444" strokeWidth="0.1" opacity="0.2" />
                      <line x1="46" y1="35" x2="54" y2="35" stroke="#EF4444" strokeWidth="0.1" opacity="0.2" />
                      {/* Trachea - tube with rings */}
                      <path
                        d="M44 38 L44 54 Q44 56 46 56 L54 56 Q56 56 56 54 L56 38"
                        fill="url(#airwayFillGradRich)"
                        stroke="url(#airwayStrokeGradRich)"
                        strokeWidth="0.35"
                      />
                      {/* Tracheal rings */}
                      <line x1="44" y1="42" x2="56" y2="42" stroke="#60A5FA" strokeWidth="0.1" opacity="0.25" />
                      <line x1="44" y1="46" x2="56" y2="46" stroke="#60A5FA" strokeWidth="0.1" opacity="0.25" />
                      <line x1="44" y1="50" x2="56" y2="50" stroke="#60A5FA" strokeWidth="0.1" opacity="0.25" />
                      {/* Bronchi - branching */}
                      <path
                        d="M44 56 Q38 58 28 62 Q24 64 20 68"
                        fill="none"
                        stroke="url(#airwayStrokeGradRich)"
                        strokeWidth="0.35"
                      />
                      <path
                        d="M56 56 Q62 58 72 62 Q76 64 80 68"
                        fill="none"
                        stroke="url(#airwayStrokeGradRich)"
                        strokeWidth="0.35"
                      />
                      {/* Left lung - more realistic shape */}
                      <path
                        d="M4 68 Q2 62 6 58 Q12 54 20 56 Q26 58 28 62 L30 68 Q32 78 28 86 Q24 92 18 94 Q12 96 8 92 Q4 88 2 80 Z"
                        fill="url(#airwayFillGradRich)"
                        stroke="url(#airwayStrokeGradRich)"
                        strokeWidth="0.35"
                      />
                      {/* Right lung - slightly larger (anatomically correct) */}
                      <path
                        d="M96 68 Q98 62 94 58 Q88 54 80 56 Q74 58 72 62 L70 68 Q68 78 72 86 Q76 92 82 94 Q88 96 92 92 Q96 88 98 80 Z"
                        fill="url(#airwayFillGradRich)"
                        stroke="url(#airwayStrokeGradRich)"
                        strokeWidth="0.35"
                      />
                      {/* Alveoli suggestions at lung bases */}
                      <circle cx="12" cy="88" r="1.5" fill="none" stroke="#93C5FD" strokeWidth="0.1" opacity="0.3" />
                      <circle cx="16" cy="90" r="1.2" fill="none" stroke="#93C5FD" strokeWidth="0.1" opacity="0.3" />
                      <circle cx="10" cy="84" r="1" fill="none" stroke="#93C5FD" strokeWidth="0.1" opacity="0.25" />
                      <circle cx="18" cy="86" r="1.3" fill="none" stroke="#93C5FD" strokeWidth="0.1" opacity="0.25" />
                      <circle cx="84" cy="88" r="1.5" fill="none" stroke="#93C5FD" strokeWidth="0.1" opacity="0.3" />
                      <circle cx="88" cy="90" r="1.2" fill="none" stroke="#93C5FD" strokeWidth="0.1" opacity="0.3" />
                      <circle cx="90" cy="84" r="1" fill="none" stroke="#93C5FD" strokeWidth="0.1" opacity="0.25" />
                      <circle cx="82" cy="86" r="1.3" fill="none" stroke="#93C5FD" strokeWidth="0.1" opacity="0.25" />
                      {/* Air flow arrows */}
                      <polygon points="50,8 48,6 52,6" fill="#60A5FA" opacity="0.35" />
                      <line x1="50" y1="10" x2="50" y2="20" stroke="#60A5FA" strokeWidth="0.15" strokeDasharray="1 0.5" opacity="0.3" />
                      <polygon points="50,22 48,20 52,20" fill="#60A5FA" opacity="0.3" />
                      <line x1="50" y1="24" x2="50" y2="38" stroke="#60A5FA" strokeWidth="0.15" strokeDasharray="1 0.5" opacity="0.25" />
                      <polygon points="50,40 48,38 52,38" fill="#60A5FA" opacity="0.25" />
                      {/* Center line */}
                      <line x1="50" y1="5" x2="50" y2="56" stroke="#60A5FA" strokeWidth="0.12" strokeDasharray="0.8 0.8" opacity="0.2" />
                    </g>
                  )}

                  {type === 'pulse' && (
                    <g filter="url(#softShadow)">
                      {/* Radial background glow - warm red */}
                      <circle cx="50" cy="38" r="35" fill="url(#pulseBgGlow)" />
                      {/* Head */}
                      <path
                        d="M38 4 Q38 0 50 0 Q62 0 62 4 L62 10 Q62 16 56 16 L54 16 Q52 18 50 18 Q48 18 46 16 L44 16 Q38 16 38 10 Z"
                        fill="url(#pulseOutlineGrad)"
                        stroke="url(#pulseStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Neck */}
                      <path
                        d="M44 16 L44 19 Q44 20 42 20 L38 20 Q36 20 35 19 L34 18 M56 16 L56 19 Q56 20 58 20 L62 20 Q64 20 65 19 L66 18"
                        fill="none"
                        stroke="url(#pulseStrokeGrad)"
                        strokeWidth="0.35"
                      />
                      {/* Shoulders */}
                      <path d="M35 20 Q30 20 26 23 L22 27 Q20 29 20 31" fill="none" stroke="url(#pulseStrokeGrad)" strokeWidth="0.35" />
                      <path d="M65 20 Q70 20 74 23 L78 27 Q80 29 80 31" fill="none" stroke="url(#pulseStrokeGrad)" strokeWidth="0.35" />
                      {/* Torso */}
                      <path
                        d="M30 20 Q30 19 34 19 L66 19 Q70 19 70 20 L71 38 Q71 50 69 55 Q68 58 66 58 L34 58 Q32 58 31 55 Q29 50 29 38 Z"
                        fill="url(#pulseOutlineGrad)"
                        stroke="url(#pulseStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Left arm */}
                      <path
                        d="M30 22 Q28 21 26 23 L20 31 Q18 33 17 36 L12 44 Q10 47 10 50 L10 56 Q10 58 11 59 Q12 60 14 60 L16 60 Q18 60 18 58 L18 54 L20 44 L26 34 L30 28"
                        fill="url(#pulseOutlineGrad)"
                        stroke="url(#pulseStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Right arm */}
                      <path
                        d="M70 22 Q72 21 74 23 L80 31 Q82 33 83 36 L88 44 Q90 47 90 50 L90 56 Q90 58 89 59 Q88 60 86 60 L84 60 Q82 60 82 58 L82 54 L80 44 L74 34 L70 28"
                        fill="url(#pulseOutlineGrad)"
                        stroke="url(#pulseStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Left leg */}
                      <path
                        d="M32 58 L32 62 L34 62 L34 88 Q34 90 34 92 L34 94 Q34 96 36 96 L42 96 Q44 96 44 94 Q44 92 44 90 L44 62 L48 62 L48 58"
                        fill="url(#pulseOutlineGrad)"
                        stroke="url(#pulseStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Left foot */}
                      <path d="M34 94 Q34 96 30 96 L28 95 Q26 94 28 93 L34 92" fill="url(#pulseOutlineGrad)" stroke="url(#pulseStrokeGrad)" strokeWidth="0.3" />
                      {/* Right leg */}
                      <path
                        d="M52 58 L52 62 L54 62 L54 88 Q54 90 54 92 L54 94 Q54 96 56 96 L62 96 Q64 96 64 94 Q64 92 64 90 L64 62 L68 62 L68 58"
                        fill="url(#pulseOutlineGrad)"
                        stroke="url(#pulseStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Right foot */}
                      <path d="M64 94 Q64 96 68 96 L70 95 Q72 94 70 93 L64 92" fill="url(#pulseOutlineGrad)" stroke="url(#pulseStrokeGrad)" strokeWidth="0.3" />
                      {/* Center line */}
                      <line x1="50" y1="19" x2="50" y2="58" stroke="#F87171" strokeWidth="0.12" strokeDasharray="1 1" opacity="0.2" />

                      {/* Animated pulse point indicators */}
                      {/* Temporal pulse - temple area */}
                      <circle cx="40" cy="6" r="1.5" fill="#EF4444" opacity="0.8" filter="url(#pulseGlow)" className="heartbeat-anim" />
                      <circle cx="40" cy="6" r="1.5" fill="none" stroke="#EF4444" strokeWidth="0.15" className="pulse-ring-anim" />
                      {/* Dotted leader line to label area */}
                      <line x1="40" y1="8" x2="38" y2="4" stroke="#EF4444" strokeWidth="0.1" strokeDasharray="0.5 0.3" opacity="0.4" />

                      {/* Carotid pulse - neck */}
                      <circle cx="58" cy="16" r="1.5" fill="#DC2626" opacity="0.8" filter="url(#pulseGlow)" className="heartbeat-anim" />
                      <circle cx="58" cy="16" r="1.5" fill="none" stroke="#DC2626" strokeWidth="0.15" className="pulse-ring-anim" style={{ animationDelay: '0.2s' }} />
                      <line x1="58" y1="18" x2="60" y2="14" stroke="#DC2626" strokeWidth="0.1" strokeDasharray="0.5 0.3" opacity="0.4" />

                      {/* Apical pulse - chest left */}
                      <circle cx="45" cy="30" r="1.5" fill="#F43F5E" opacity="0.8" filter="url(#pulseGlow)" className="heartbeat-anim" />
                      <circle cx="45" cy="30" r="1.5" fill="none" stroke="#F43F5E" strokeWidth="0.15" className="pulse-ring-anim" style={{ animationDelay: '0.4s' }} />
                      <line x1="45" y1="32" x2="44" y2="28" stroke="#F43F5E" strokeWidth="0.1" strokeDasharray="0.5 0.3" opacity="0.4" />

                      {/* Brachial pulse - upper arm */}
                      <circle cx="16" cy="32" r="1.5" fill="#F97316" opacity="0.8" filter="url(#pulseGlow)" className="heartbeat-anim" />
                      <circle cx="16" cy="32" r="1.5" fill="none" stroke="#F97316" strokeWidth="0.15" className="pulse-ring-anim" style={{ animationDelay: '0.6s' }} />
                      <line x1="16" y1="34" x2="14" y2="28" stroke="#F97316" strokeWidth="0.1" strokeDasharray="0.5 0.3" opacity="0.4" />

                      {/* Radial pulse - wrist */}
                      <circle cx="12" cy="48" r="1.5" fill="#FB923C" opacity="0.8" filter="url(#pulseGlow)" className="heartbeat-anim" />
                      <circle cx="12" cy="48" r="1.5" fill="none" stroke="#FB923C" strokeWidth="0.15" className="pulse-ring-anim" style={{ animationDelay: '0.8s' }} />
                      <line x1="12" y1="50" x2="10" y2="46" stroke="#FB923C" strokeWidth="0.1" strokeDasharray="0.5 0.3" opacity="0.4" />

                      {/* Femoral pulse - groin */}
                      <circle cx="42" cy="58" r="1.5" fill="#E11D48" opacity="0.8" filter="url(#pulseGlow)" className="heartbeat-anim" />
                      <circle cx="42" cy="58" r="1.5" fill="none" stroke="#E11D48" strokeWidth="0.15" className="pulse-ring-anim" style={{ animationDelay: '1.0s' }} />
                      <line x1="42" y1="60" x2="40" y2="56" stroke="#E11D48" strokeWidth="0.1" strokeDasharray="0.5 0.3" opacity="0.4" />

                      {/* Popliteal pulse - behind knee */}
                      <circle cx="44" cy="74" r="1.5" fill="#BE185D" opacity="0.8" filter="url(#pulseGlow)" className="heartbeat-anim" />
                      <circle cx="44" cy="74" r="1.5" fill="none" stroke="#BE185D" strokeWidth="0.15" className="pulse-ring-anim" style={{ animationDelay: '1.2s' }} />
                      <line x1="44" y1="76" x2="42" y2="72" stroke="#BE185D" strokeWidth="0.1" strokeDasharray="0.5 0.3" opacity="0.4" />

                      {/* Posterior tibial pulse - ankle */}
                      <circle cx="38" cy="88" r="1.5" fill="#A855F7" opacity="0.8" filter="url(#pulseGlow)" className="heartbeat-anim" />
                      <circle cx="38" cy="88" r="1.5" fill="none" stroke="#A855F7" strokeWidth="0.15" className="pulse-ring-anim" style={{ animationDelay: '1.4s' }} />
                      <line x1="38" y1="90" x2="36" y2="86" stroke="#A855F7" strokeWidth="0.1" strokeDasharray="0.5 0.3" opacity="0.4" />

                      {/* Dorsalis pedis pulse - top of foot */}
                      <circle cx="52" cy="94" r="1.5" fill="#7C3AED" opacity="0.8" filter="url(#pulseGlow)" className="heartbeat-anim" />
                      <circle cx="52" cy="94" r="1.5" fill="none" stroke="#7C3AED" strokeWidth="0.15" className="pulse-ring-anim" style={{ animationDelay: '1.6s' }} />
                      <line x1="52" y1="96" x2="50" y2="92" stroke="#7C3AED" strokeWidth="0.1" strokeDasharray="0.5 0.3" opacity="0.4" />
                    </g>
                  )}

                  {type === 'brain' && (
                    <g filter="url(#brainShadow)">
                      {/* Radial background glow */}
                      <circle cx="40" cy="38" r="38" fill="url(#brainBgGlow)" />
                      {/* Main brain outline - lateral (side) view */}
                      <path
                        d="M10 40 Q8 28 12 18 Q16 10 26 6 Q36 2 48 4 Q58 2 66 6 Q74 10 78 18 Q82 26 80 36 Q82 42 78 48 Q76 52 78 56 Q80 60 76 64 Q72 68 68 66 Q64 70 58 72 Q52 74 48 76 Q44 80 44 86 Q44 90 46 94 L48 98 Q48 100 46 100 L42 100 Q40 98 40 96 Q40 92 38 88 Q36 84 32 82 Q28 80 24 78 Q18 74 14 68 Q10 60 10 52 Z"
                        fill="url(#brainFillGrad)"
                        stroke="url(#brainStrokeGrad)"
                        strokeWidth="0.55"
                      />
                      {/* Cerebellum - separate rounded structure at back-bottom */}
                      <path
                        d="M68 66 Q74 62 78 58 Q82 54 80 48 Q84 52 84 58 Q84 66 78 72 Q72 78 66 76 Q62 74 64 70 Z"
                        fill="url(#brainFillGrad)"
                        stroke="url(#brainStrokeGrad)"
                        strokeWidth="0.45"
                      />
                      {/* Cerebellum horizontal striations */}
                      <path d="M70 62 Q76 60 80 56" fill="none" stroke="#A78BFA" strokeWidth="0.1" opacity="0.25" />
                      <path d="M68 66 Q74 64 80 60" fill="none" stroke="#A78BFA" strokeWidth="0.1" opacity="0.25" />
                      <path d="M66 70 Q72 68 78 64" fill="none" stroke="#A78BFA" strokeWidth="0.1" opacity="0.25" />
                      {/* Brainstem extending downward */}
                      <path
                        d="M42 76 Q40 80 40 86 Q40 92 42 96 L44 100 Q46 102 48 100 L46 96 Q44 92 44 86 Q44 80 46 76 Z"
                        fill="url(#brainFillGrad)"
                        stroke="url(#brainStrokeGrad)"
                        strokeWidth="0.4"
                      />
                      {/* Lobe boundary lines - dashed */}
                      {/* Central sulcus (frontal/parietal boundary) */}
                      <path
                        d="M48 6 Q50 14 52 22 Q54 30 52 38"
                        fill="none"
                        stroke="#A78BFA"
                        strokeWidth="0.2"
                        strokeDasharray="1.5 0.8"
                        opacity="0.4"
                      />
                      {/* Lateral sulcus (Sylvian fissure - temporal boundary) */}
                      <path
                        d="M26 42 Q34 38 44 36 Q52 34 60 38"
                        fill="none"
                        stroke="#A78BFA"
                        strokeWidth="0.2"
                        strokeDasharray="1.5 0.8"
                        opacity="0.4"
                      />
                      {/* Parieto-occipital sulcus */}
                      <path
                        d="M62 12 Q64 20 66 28 Q68 36 66 44"
                        fill="none"
                        stroke="#A78BFA"
                        strokeWidth="0.2"
                        strokeDasharray="1.5 0.8"
                        opacity="0.4"
                      />
                      {/* Brain surface wrinkle suggestions */}
                      {/* Frontal lobe wrinkles */}
                      <path d="M20 16 Q28 14 36 16" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      <path d="M18 22 Q26 20 34 22 Q40 24 44 22" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      <path d="M16 28 Q24 26 32 28 Q38 30 42 28" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      <path d="M18 34 Q26 32 34 34" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      {/* Parietal lobe wrinkles */}
                      <path d="M54 10 Q58 12 62 10" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      <path d="M52 16 Q56 18 60 16 Q64 14 66 16" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      <path d="M54 22 Q58 24 62 22" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      {/* Temporal lobe wrinkles */}
                      <path d="M18 48 Q24 46 30 48" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      <path d="M16 54 Q22 52 28 54" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      <path d="M18 60 Q24 58 30 60" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      {/* Occipital wrinkles */}
                      <path d="M70 18 Q74 22 72 28" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      <path d="M72 24 Q76 28 74 34" fill="none" stroke="#8B5CF6" strokeWidth="0.1" opacity="0.2" />
                      {/* Subtle shadow overlay for depth */}
                      <path
                        d="M10 40 Q8 28 12 18 Q16 10 26 6 Q36 2 48 4 Q58 2 66 6 Q74 10 78 18 Q82 26 80 36 Q82 42 78 48"
                        fill="none"
                        stroke="#7C3AED"
                        strokeWidth="0.08"
                        opacity="0.15"
                      />
                    </g>
                  )}

                  {/* Clickable regions */}
                  {regions.map((region) => {
                    const isSelected = selectedRegion?.id === region.id
                    const isHovered = hoveredRegion === region.id
                    return (
                      <g
                        key={region.id}
                        onClick={() => setSelectedRegion(isSelected ? null : region)}
                        onMouseEnter={() => setHoveredRegion(region.id)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        className="cursor-pointer svg-interactive-region"
                        filter={isSelected ? 'url(#regionGlow)' : isHovered ? 'url(#softShadow)' : undefined}
                        style={{ transition: 'filter 0.3s ease' }}
                      >
                        {/* Region rectangle with rounded corners */}
                        <rect
                          x={region.x}
                          y={region.y}
                          width={region.width}
                          height={region.height}
                          rx="3"
                          ry="3"
                          fill={getRegionFill(region, isSelected, isHovered)}
                          stroke={getRegionStroke(region, isSelected, isHovered)}
                          strokeWidth={isSelected ? 0.8 : isHovered ? 0.6 : 0.35}
                          className="svg-region-rect"
                          style={{
                            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        />
                        {/* Hover/selected highlight border overlay */}
                        {(isSelected || isHovered) && (
                          <rect
                            x={region.x - 0.3}
                            y={region.y - 0.3}
                            width={region.width + 0.6}
                            height={region.height + 0.6}
                            rx="3.5"
                            ry="3.5"
                            fill="none"
                            stroke={region.color}
                            strokeWidth={isSelected ? 0.3 : 0.2}
                            strokeOpacity={isSelected ? 0.5 : 0.3}
                            strokeDasharray={isSelected ? 'none' : '1 0.5'}
                            style={{
                              transition: 'all 0.25s ease',
                            }}
                          />
                        )}
                        {/* Labels */}
                        {showLabels && (
                          <g className="pointer-events-none select-none">
                            {/* Label background pill */}
                            <rect
                              x={region.x + region.width / 2 - (region.shortName.length * 1.6 + 2)}
                              y={region.y + region.height / 2 - 2.5}
                              width={region.shortName.length * 3.2 + 4}
                              height={5}
                              rx="2.5"
                              ry="2.5"
                              fill={isDark ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.92)'}
                              stroke={isSelected || isHovered ? region.color : 'rgba(148, 163, 184, 0.3)'}
                              strokeWidth={0.2}
                              style={{ transition: 'all 0.2s ease' }}
                            />
                            {/* Label text */}
                            <text
                              x={region.x + region.width / 2}
                              y={region.y + region.height / 2 + 1}
                              textAnchor="middle"
                              fontSize="2.8"
                              fontFamily="Inter, system-ui, sans-serif"
                              fill={isSelected || isHovered ? region.color : isDark ? '#CBD5E1' : '#334155'}
                              fontWeight={isSelected ? 700 : 600}
                              letterSpacing="0.02em"
                              style={{ transition: 'fill 0.2s ease' }}
                            >
                              {region.shortName}
                            </text>
                          </g>
                        )}
                      </g>
                    )
                  })}
                </svg>

                {/* Zoom level indicator */}
                {zoom !== 1 && (
                  <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-[10px] text-muted-foreground border border-border/40">
                    {Math.round(zoom * 100)}%
                  </div>
                )}
              </div>
              {/* Prompt */}
              <div className="px-4 py-2 border-t border-border/30 bg-muted/10 flex items-center justify-center gap-2">
                <MousePointer2 className="w-3 h-3 text-muted-foreground/60" />
                <p className="text-[11px] text-muted-foreground/70">
                  {selectedRegion ? 'Click another region to explore, or click the same to deselect' : 'Click a region on the diagram to see details — hover to preview'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info panel */}
        <div className="space-y-3 md:col-span-1">
          {selectedRegion ? (
            <Card className="border-primary/20 overflow-hidden animate-in fade-in-0 slide-in-from-right-2 duration-300">
              {/* Color header bar */}
              <div
                className="h-1.5"
                style={{ background: `linear-gradient(90deg, ${selectedRegion.color}, ${selectedRegion.color}88)` }}
              />
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: selectedRegion.color }}
                  >
                    {selectedRegion.shortName.slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm leading-tight">{selectedRegion.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{type === 'body' ? 'Body Region' : type === 'heart' ? 'Heart Chamber' : type === 'airway' ? 'Airway Structure' : type === 'pulse' ? 'Pulse Point' : 'Brain Region'}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Description</p>
                    <p className="text-sm leading-relaxed">{selectedRegion.description}</p>
                  </div>
                  <div
                    className="p-3 rounded-xl border"
                    style={{
                      backgroundColor: `${selectedRegion.color}08`,
                      borderColor: `${selectedRegion.color}25`,
                    }}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Sparkles className="w-3 h-3" style={{ color: selectedRegion.color }} />
                      <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: selectedRegion.color }}>EMS Relevance</p>
                    </div>
                    <p className="text-sm leading-relaxed">{selectedRegion.emsRelevance}</p>
                  </div>
                </div>
                {/* Quick navigation to next region */}
                <div className="mt-3 pt-3 border-t border-border/40">
                  <button
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    onClick={() => {
                      const idx = regions.findIndex(r => r.id === selectedRegion.id)
                      const next = regions[(idx + 1) % regions.length]
                      setSelectedRegion(next)
                    }}
                  >
                    Next region <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-border/60">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
                  <Info className="w-7 h-7 text-muted-foreground/40" />
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Explore the Diagram</p>
                <p className="text-xs text-muted-foreground/70 leading-relaxed">
                  Click on any highlighted region to view its description and EMS clinical relevance. Hover to preview.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
                  {regions.slice(0, 5).map(r => (
                    <span
                      key={r.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border border-border/40 bg-muted/30"
                      style={{ color: r.color }}
                    >
                      {r.shortName}
                    </span>
                  ))}
                  {regions.length > 5 && (
                    <span className="text-[10px] text-muted-foreground">+{regions.length - 5} more</span>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Region quick list */}
          <Card className="border-border/40">
            <CardContent className="p-3">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">All Regions</p>
              <div className="space-y-0.5 max-h-48 overflow-y-auto custom-scrollbar">
                {regions.map(r => (
                  <button
                    key={r.id}
                    className={cn(
                      'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left text-xs transition-all',
                      selectedRegion?.id === r.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                    )}
                    onClick={() => setSelectedRegion(selectedRegion?.id === r.id ? null : r)}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: r.color, opacity: selectedRegion?.id === r.id ? 1 : 0.5 }}
                    />
                    <span className="min-w-0 break-words">{r.name}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// ==================== EQUIPMENT GALLERY ====================
interface EquipmentItem {
  id: string
  name: string
  shortName: string
  purpose: string
  image: string
  category: string
  color: string
  specifications?: Record<string, string>
  whenToUse?: string[]
  safetyNotes?: string[]
}

const equipmentData: EquipmentItem[] = [
  {
    id: 'stretcher',
    name: 'Stretcher (Gurney)',
    shortName: 'Stretcher',
    purpose: 'The workhorse of every ambulance call — the stretcher is the platform upon which lives are carried to safety. Used to safely transport patients from the scene of an emergency to the ambulance and into the hospital, it supports immobilization, comfort, and dignity during the most vulnerable moments of a person\'s life.',
    image: '/equipment/equipment_p1_img1.png',
    category: 'Transport',
    color: '#6366F1',
    specifications: { Weight: '32-40 kg', Dimensions: '188 × 64 cm (unfolded)', 'Load Capacity': '159 kg (350 lbs)', Material: 'Aluminum alloy frame, vinyl cover', Certification: 'EN 1865 / FDA', 'Power Source': 'Manual hydraulic lift' },
    whenToUse: ['Patient transport from scene to ambulance', 'Inter-facility transfers', 'Mass casualty incidents (MCI)', 'Non-ambulatory patients at any scene', 'Bariatric patients (use bariatric stretcher)'],
    safetyNotes: ['Always secure patient with straps at chest, waist, and legs', 'Raise side rails during transport', 'Verify weight limit before loading', 'Lock wheels when loading/unloading', 'Never leave patient unattended on stretcher'],
  },
  {
    id: 'bvm',
    name: 'Bag-Valve-Mask (BVM / Ambu Bag)',
    shortName: 'BVM',
    purpose: 'A hand-held device that breathes life back into still lungs. The BVM is used to provide positive pressure ventilation to patients who are not breathing or breathing inadequately, allowing rescuers to manually push oxygen into the lungs with each squeeze of the bag. Essential in CPR, respiratory arrest, and during intubation procedures.',
    image: '/equipment/equipment_p1_img2.png',
    category: 'Airway',
    color: '#3B82F6',
    specifications: { Capacity: 'Adult: 1600 mL, Pediatric: 500 mL', 'Flow Rate': 'Delivers ~600 mL per squeeze (adult)', Material: 'Silicone bag, clear mask', 'Size Options': 'Adult, Child, Infant', Certification: 'ISO 10651-4', 'Response Time': 'Immediate ventilation' },
    whenToUse: ['Cardiac arrest (CPR ventilation)', 'Respiratory arrest / failure', 'Apnea of any cause', 'During RSI/intubation preparation', 'Hypoventilation with SpO₂ < 90%', 'Pre-oxygenation before airway procedures'],
    safetyNotes: ['Ensure proper mask seal (C-E technique)', 'Do NOT over-ventilate (watch for gastric distension)', 'Use OPA/NPA to maintain airway patency', 'Connect to supplemental oxygen at 15 L/min', 'Squeeze at 10-12 breaths/min (adult)', 'Watch for chest rise — if absent, reposition'],
  },
  {
    id: 'aed',
    name: 'Automated External Defibrillator (AED)',
    shortName: 'AED',
    purpose: 'When a heart stutters into chaos, the AED speaks the language of salvation. This portable electronic device analyzes heart rhythms and delivers a therapeutic shock to restore normal rhythm in cases of sudden cardiac arrest — the difference between life and death measured in minutes. Every minute without defibrillation decreases survival by 7-10%.',
    image: '/equipment/equipment_p1_img3.png',
    category: 'Cardiac',
    color: '#EF4444',
    specifications: { Weight: '1.5-3.5 kg', Accuracy: '> 95% rhythm sensitivity', 'Power Source': 'Lithium battery (3-5 year shelf life)', Lifespan: 'Battery: 3-5 years, Pads: 2-3 years', Certification: 'FDA / MDR / DOH approved', 'Shock Energy': '150-360 Joules biphasic' },
    whenToUse: ['Witnessed or unwitnessed cardiac arrest', 'VF (Ventricular Fibrillation) rhythm', 'Pulseless VT (Ventricular Tachycardia)', 'Unresponsive patient with no normal breathing', 'When patient is pulseless and apneic', 'As soon as AED arrives at cardiac arrest scene'],
    safetyNotes: ['Ensure NO one is touching patient during analysis/shock', 'Remove medication patches and dry the chest', 'Do NOT use on wet surfaces — dry first', 'Place pads at least 2.5 cm away from pacemakers', 'Remove metallic jewelry from chest area', 'Always resume CPR immediately after shock delivery'],
  },
  {
    id: 'c-collar',
    name: 'Cervical Collar (C-Collar)',
    shortName: 'C-Collar',
    purpose: 'Wrapping the neck in cautious embrace, the cervical collar cradles the cervical spine in protective stillness. Applied to patients with potential neck injuries to prevent flexion, extension, and rotation of the head, it is often the first immobilization device placed on a trauma patient. Must be properly sized for effectiveness.',
    image: '/equipment/equipment_p2_img1.png',
    category: 'Immobilization',
    color: '#EC4899',
    specifications: { Material: 'Plastic shell with foam padding', 'Size Options': '4 sizes: Tall, Regular, Short, No-Neck', Dimensions: 'Fits neck circumference 9-22 inches', Weight: '~180 g', Certification: 'ANSI/NASPE, CE Marked', Lifespan: 'Single-use (disposable) or reusable' },
    whenToUse: ['Mechanism of injury suggestive of cervical spine trauma', 'Fall from height (> 6 feet / 2 meters)', 'Motor vehicle collision (especially frontal impact)', 'Diving injury / shallow water incident', 'Unconscious trauma patient', 'Patient complaining of neck pain after trauma', 'Penetrating injury near neck/throat'],
    safetyNotes: ['Always measure using 3-finger technique for sizing', 'Never force collar on — if resistance, select larger size', 'Check distal neurovascular status after application', 'Remove ONLY when cleared by hospital X-ray', 'Combination with backboard provides full spinal immobilization', 'Reassess fit after any patient movement'],
  },
  {
    id: 'spine-board',
    name: 'Spine Board (Backboard)',
    shortName: 'Backboard',
    purpose: 'A rigid slab of protection that transforms chaos into stillness. Used to immobilize patients with suspected spinal injuries during extrication and transport, the spine board prevents further damage to the spinal cord by keeping the entire vertebral column aligned and motionless. Used with straps and head immobilizers.',
    image: '/equipment/equipment_p2_img2.png',
    category: 'Immobilization',
    color: '#F59E0B',
    specifications: { Dimensions: '183 × 41 × 5 cm', Weight: '6-8 kg (plastic), 7-9 kg (wood)', 'Load Capacity': 'Up to 227 kg (500 lbs)', Material: 'HDPE plastic or plywood with runners', Certification: 'EN 1865', Lifespan: 'Reusable, inspect for cracks before each use' },
    whenToUse: ['Suspected spinal cord injury', 'Multi-system trauma with MOI', 'Unconscious trauma patient', 'Penetrating trauma near spine', 'Patient extrication from vehicle/water', 'Mass casualty incident patient packaging', 'Lower extremity fracture with spinal concern'],
    safetyNotes: ['Use log-roll technique to place patient on board', 'Secure with straps: chest, waist, thighs, legs', 'Apply head immobilizer device (blocks/tape)', 'Pad voids under head, knees, and arch of back', 'Never leave patient on backboard > 2 hours (pressure injury risk)', 'Inspect board for cracks/warps before each use'],
  },
  {
    id: 'suction-unit',
    name: 'Portable Suction Unit',
    shortName: 'Suction',
    purpose: 'When airways fill with blood, vomit, or secretions, the suction unit stands as the guardian of every breath. This device creates negative pressure to quickly clear a patient\'s airway of obstructive fluids and materials, ensuring the path for oxygen remains open and unobstructed. Critical before and during intubation.',
    image: '/equipment/equipment_p2_img3.png',
    category: 'Airway',
    color: '#8B5CF6',
    specifications: { Weight: '3-5 kg (portable unit)', 'Flow Rate': '30+ L/min vacuum flow', 'Suction Pressure': '300-500 mmHg', 'Power Source': 'Rechargeable battery + DC/AC', Capacity: '1000 mL collection canister', Certification: 'ISO 10079-1' },
    whenToUse: ['Visible blood, vomit, or secretions in airway', 'Before and during intubation attempt', 'Trauma patient with facial/oral bleeding', 'Active seizure with excessive oral secretions', 'Near-drowning with foamy airway secretions', 'Any patient unable to manage own secretions'],
    safetyNotes: ['Always test suction before approaching patient', 'Do NOT suction for more than 15 seconds at a time (adult)', 'Do NOT insert catheter beyond base of tongue', 'Use rigid catheter (Yankauer) for oral suctioning', 'Use soft catheter for nasopharyngeal suctioning', 'Clean and disinfect after every use'],
  },
  {
    id: 'pulse-oximeter',
    name: 'Pulse Oximeter',
    shortName: 'Pulse Ox',
    purpose: 'A silent sentinel that clips onto a fingertip and reads the body\'s oxygen story through light. This non-invasive device measures oxygen saturation (SpO₂) and pulse rate in real time, providing critical data that guides oxygen therapy and respiratory treatment decisions. Normal SpO₂ is 95-100%.',
    image: '/equipment/equipment_p2_img4.png',
    category: 'Monitoring',
    color: '#10B981',
    specifications: { Accuracy: '±2% for SpO₂ 70-100%', 'Range': 'SpO₂: 0-100%, Pulse: 25-250 bpm', 'Response Time': '5-10 seconds to reading', 'Power Source': 'AAA batteries or rechargeable', Weight: '50-60 g', Certification: 'FDA Class II, CE Marked' },
    whenToUse: ['Every patient assessment (routine vital signs)', 'Respiratory distress or failure', 'COPD and asthma exacerbations', 'Carbon monoxide poisoning (note: SpO₂ may be falsely normal)', 'During oxygen therapy to titrate flow', 'Shock assessment (tissue perfusion indicator)'],
    safetyNotes: ['Cannot detect CO poisoning — use co-oximetry', 'Cold extremities, nail polish, poor perfusion → unreliable', 'Place on finger with best perfusion (check multiple sites)', 'Do NOT rely solely on SpO₂ — assess clinical picture', 'Motion artifact causes false low readings', 'Hypothermic patients may show falsely low readings'],
  },
  {
    id: 'oxygen-tank',
    name: 'Oxygen Tank with Regulator',
    shortName: 'O₂ Tank',
    purpose: 'The invisible elixir of survival — compressed oxygen stored in portable cylinders, delivered through a regulator that controls flow rate. Essential for treating hypoxia, respiratory distress, carbon monoxide poisoning, and virtually any condition where the body craves more oxygen than the air alone can provide.',
    image: '/equipment/equipment_p2_img5.png',
    category: 'Respiratory',
    color: '#06B6D4',
    specifications: { Capacity: 'D: 350 L, E: 625 L, M: 3000 L', 'Flow Rate': '1-15 L/min (adjustable via regulator)', Weight: 'D: 5.4 kg, E: 6.8 kg, M: 16 kg', 'Power Source': 'Compressed medical O₂ gas', Material: 'Aluminum or steel cylinder', Certification: 'DOT / DOH approved, hydrostatically tested' },
    whenToUse: ['Hypoxia (SpO₂ < 94%)', 'Respiratory distress / failure', 'Chest pain (suspected MI)', 'Carbon monoxide poisoning', 'Major trauma / shock', 'CPR (connect to BVM at 15 L/min)', 'Anaphylaxis with respiratory compromise'],
    safetyNotes: ['NO smoking or open flames near O₂ equipment', 'Secure tank upright during transport', 'Check gauge pressure — minimum 500 psi for transport', 'Use non-petroleum-based lubricants only', 'Crack valve briefly before attaching regulator (debris removal)', 'Do NOT use on COPD patients at high flow without medical order'],
  },
  {
    id: 'cardiac-monitor',
    name: 'Patient / Cardiac Monitor',
    shortName: 'Cardiac Monitor',
    purpose: 'A window into the electrical symphony of the heart and the body\'s vital signs. The portable patient monitor displays real-time ECG rhythms, heart rate, SpO₂, blood pressure, and other parameters — enabling paramedics to identify life-threatening conditions like myocardial infarction and arrhythmias en route to the hospital.',
    image: '/equipment/equipment_p3_img1.png',
    category: 'Monitoring',
    color: '#14B8A6',
    specifications: { 'Range': 'ECG: 15-300 bpm, SpO₂: 0-100%, NIBP: 40-270 mmHg', Accuracy: 'ECG diagnostic quality, SpO₂ ±2%', 'Response Time': '< 8 seconds for full vital signs', 'Power Source': 'Rechargeable lithium-ion battery (3-4 hours)', Weight: '3-5 kg (portable unit)', Certification: 'FDA Class II / CE / IEC 60601' },
    whenToUse: ['Chest pain / suspected acute coronary syndrome', 'Cardiac arrest (rhythm analysis)', 'Dysrhythmia detection and monitoring', 'Shock or hemodynamic instability', 'Drug overdose monitoring', 'Inter-facility transfer of critical patients', 'Pre-hospital 12-lead ECG acquisition'],
    safetyNotes: ['Ensure good electrode contact — clean/dry skin first', 'Place limb electrodes on flat muscle areas (avoid bones)', 'Minimize motion artifact during transport', 'Always verify monitor alarm settings are appropriate', 'Document rhythm strips for hospital handover', 'Do NOT rely solely on monitor — assess patient clinically'],
  },
  {
    id: 'ventilator',
    name: 'Portable Mechanical Ventilator',
    shortName: 'Ventilator',
    purpose: 'When the lungs cannot breathe on their own, the ventilator takes over. This portable device provides controlled positive-pressure ventilation to patients who are unable to breathe adequately on their own — delivering precise tidal volumes, respiratory rates, and oxygen concentrations during emergency transport.',
    image: '/equipment/equipment_p3_img2.png',
    category: 'Respiratory',
    color: '#0891B2',
    specifications: { 'Flow Rate': 'Up to 180 L/min peak flow', 'Range': 'Tidal volume: 50-1200 mL, Rate: 1-60 breaths/min', 'Power Source': 'Internal battery + external O₂/air', Accuracy: 'Tidal volume ±10%', Weight: '3-7 kg (transport ventilator)', Certification: 'FDA Class II / IEC 60601-2-12' },
    whenToUse: ['Endotracheal intubated patients during transport', 'Respiratory failure not responding to BVM', 'ARDS with specific ventilator settings', 'ICU patient inter-facility transfer', 'Prolonged resuscitation requiring consistent ventilation', 'Neuromuscular disease with respiratory failure'],
    safetyNotes: ['Always verify ventilator settings match clinical needs', 'Monitor peak pressures and adjust for compliance', 'Have BVM as backup — ventilators can malfunction', 'Confirm ET tube position before connecting ventilator', 'Watch for patient-ventilator dyssynchrony', 'Check alarm settings before every transport'],
  },
  {
    id: 'iv-set',
    name: 'IV Fluid Administration Set',
    shortName: 'IV Set',
    purpose: 'A lifeline threaded through a vein — the IV set delivers fluids, medications, and blood products directly into the circulatory system. Used for fluid resuscitation in shock, medication administration, and maintaining venous access for critical interventions during emergency transport.',
    image: '/equipment/equipment_p3_img3.png',
    category: 'Circulatory',
    color: '#6366F1',
    specifications: { 'Flow Rate': 'Macro: 10-20 gtts/mL, Micro: 60 gtts/mL', Capacity: 'Standard 10-15 drops/mL drip chamber', Material: 'PVC tubing, ABS spike, roller clamp', 'Size Options': 'Macro-drip, Micro-drip, blood administration set', Certification: 'ISO 8536-4', Lifespan: 'Single-use, discard after 24-72 hours' },
    whenToUse: ['Hypovolemic shock (fluid resuscitation)', 'Dehydration requiring IV fluids', 'Medication administration (IV push, infusion)', 'Blood product transfusion', 'Maintaining open IV access for emergencies', 'Cardiac arrest (IO preferred, IV acceptable)'],
    safetyNotes: ['Check fluid type, expiration date, and clarity before use', 'Prime tubing to remove all air bubbles', 'Use aseptic technique during IV insertion', 'Monitor for infiltration (swelling, pain at site)', 'Calculate drip rate accurately for medication dosing', 'Never use visibly contaminated or expired fluids'],
  },
  {
    id: 'blood-pressure-cuff',
    name: 'Sphygmomanometer (Blood Pressure Cuff)',
    shortName: 'BP Cuff',
    purpose: 'The classic instrument that reads the pressure of life surging through arteries. Used to measure systolic and diastolic blood pressure, it helps paramedics assess cardiovascular stability, detect shock, and monitor the hemodynamic status of patients across every type of emergency. Available in manual (aneroid) and digital versions.',
    image: '/equipment/equipment_p3_img4.png',
    category: 'Monitoring',
    color: '#EF4444',
    specifications: { Accuracy: '±3 mmHg (aneroid), ±5 mmHg (digital)', 'Range': '0-300 mmHg', 'Size Options': 'Small, Regular, Large, Thigh (cuff must match arm)', Weight: 'Aneroid: ~300 g, Digital: ~400 g', Certification: 'ISO 81060-1', Material: 'Nylon cuff, latex/neoprene bladder, gauge' },
    whenToUse: ['Every patient assessment (baseline vital sign)', 'Shock / hypotension screening', 'Suspected internal bleeding assessment', 'Hypertensive emergency monitoring', 'Drug overdose vital sign tracking', 'Serial monitoring during transport'],
    safetyNotes: ['Cuff must cover 80% of upper arm circumference', 'Patient arm should be at heart level', 'Do NOT take BP on arm with AV fistula or mastectomy side', 'Wait 1-2 minutes between repeated measurements', 'Check cuff calibration regularly (aneroid)', 'Irregular rhythms may cause inaccurate readings'],
  },
  {
    id: 'ems-backpack',
    name: 'EMS First Responder Backpack',
    shortName: 'EMS Pack',
    purpose: 'The mobile command center for prehospital care — a rugged, organized backpack carrying medications, airway adjuncts, bandages, splints, diagnostic tools, and emergency supplies. Designed for rapid deployment at the scene, it allows medics to bring critical equipment to the patient\'s side in any terrain or situation.',
    image: '/equipment/equipment_p3_img5.png',
    category: 'Transport',
    color: '#DC2626',
    specifications: { Capacity: '35-50 liters, multiple compartments', Weight: 'Empty: 2-3 kg, Loaded: 10-15 kg', Dimensions: '55 × 30 × 28 cm (typical)', Material: '1000D nylon, waterproof coating, MOLLE webbing', Certification: 'No specific certification required', Lifespan: '5+ years with proper maintenance' },
    whenToUse: ['First response at any emergency scene', 'Mass casualty incidents (individual packs)', 'Remote/wilderness EMS response', 'Technical rescue operations', 'Community first responder deployment', 'Quick access to critical equipment before ambulance arrival'],
    safetyNotes: ['Restock immediately after every call', 'Check medication expiration dates monthly', 'Organize contents by body system for rapid access', 'Waterproof critical medications and electronics', 'Label all compartments for consistency', 'Conduct daily equipment checks per protocol'],
  },
  {
    id: 'glucometer',
    name: 'Glucometer (Blood Glucose Meter)',
    shortName: 'Glucometer',
    purpose: 'A single drop of blood reveals the metabolic truth within. This handheld device measures blood glucose levels rapidly, helping paramedics identify and treat hypoglycemia and hyperglycemia — conditions that can mimic stroke, seizures, or altered mental status. Normal range: 70-140 mg/dL.',
    image: '/equipment/equipment_p4_img1.png',
    category: 'Diagnostics',
    color: '#F97316',
    specifications: { Accuracy: '±15% at concentrations > 75 mg/dL', 'Range': '20-600 mg/dL', 'Response Time': '5-10 seconds per test', 'Power Source': '2x AAA batteries', Weight: '~50 g', Certification: 'ISO 15197:2013, FDA Class II' },
    whenToUse: ['Altered mental status of unknown cause', 'Seizure (rule out hypoglycemia)', 'Diabetic patient with any complaint', 'Suspected stroke assessment', 'Unconscious patient with no obvious cause', 'Before administering dextrose or glucagon'],
    safetyNotes: ['Always wear gloves when handling blood samples', 'Use only manufacturer-approved test strips', 'Clean fingertip with alcohol and let dry before lancing', 'Do NOT use expired test strips', 'Correlation with lab glucose: results may vary ±15%', 'Document blood glucose before and after treatment'],
  },
  {
    id: 'stethoscope',
    name: 'Stethoscope',
    shortName: 'Stethoscope',
    purpose: 'The timeless instrument that allows the healer to listen to the body\'s inner voices. Used for auscultation of heart sounds, breath sounds, and blood pressure measurement, the stethoscope remains one of the most fundamental diagnostic tools carried by every EMS professional.',
    image: '/equipment/equipment_p4_img2.png',
    category: 'Diagnostics',
    color: '#7C3AED',
    specifications: { Material: 'Stainless steel chest piece, latex-free tubing', 'Size Options': 'Adult (standard), Pediatric (smaller bell)', Weight: '150-200 g', Certification: 'No specific medical certification', Accuracy: 'Depends on user skill and ambient noise', Lifespan: '5-10 years with proper care' },
    whenToUse: ['Blood pressure measurement with manual cuff', 'Lung auscultation (wheezes, crackles, absent breath sounds)', 'Heart auscultation (murmurs, rate, rhythm)', 'Bowel sound assessment in abdominal complaints', 'Confirming ETT placement (bilateral breath sounds)', 'Cardiac arrest — confirm pulselessness'],
    safetyNotes: ['Clean earpieces and chest piece between patients', 'Use diaphragm for high-pitched sounds (normal breath sounds)', 'Use bell for low-pitched sounds (heart murmurs, bowel bruits)', 'Minimize ambient noise for accurate auscultation', 'Report findings using standard terminology', 'Stethoscope does NOT replace SpO₂ monitoring'],
  },
]

const equipmentCategories = ['All', 'Airway', 'Cardiac', 'Circulatory', 'Diagnostics', 'Immobilization', 'Monitoring', 'Respiratory', 'Transport']

function EquipmentGallery() {
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const { t } = useTranslation()
  const { progress, markEquipmentReviewed } = useAppStore()

  const filteredItems = equipmentData.filter(item => {
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCardClick = (item: EquipmentItem) => {
    setSelectedItem(item)
    setSheetOpen(true)
  }

  const navigateEquipment = (direction: 'prev' | 'next') => {
    if (!selectedItem) return
    const idx = equipmentData.findIndex(e => e.id === selectedItem.id)
    const nextIdx = direction === 'next'
      ? (idx + 1) % equipmentData.length
      : (idx - 1 + equipmentData.length) % equipmentData.length
    setSelectedItem(equipmentData[nextIdx])
  }

  const relatedEquipment = selectedItem
    ? equipmentData.filter(e => e.category === selectedItem.category && e.id !== selectedItem.id).slice(0, 5)
    : []

  const isReviewed = selectedItem ? progress.equipmentReviewed.includes(selectedItem.id) : false

  return (
    <div className="space-y-4 overflow-hidden w-full min-w-0">
      {/* Header with search */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Wrench className="w-3.5 h-3.5" />
          <span>{filteredItems.length} of {equipmentData.length} items</span>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
        {equipmentCategories.map(cat => (
          <button
            key={cat}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border',
              filterCategory === cat
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted border-border/40 hover:border-border/60'
            )}
            onClick={() => setFilterCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-w-full min-w-0">
        {filteredItems.map((item, idx) => {
          const reviewed = progress.equipmentReviewed.includes(item.id)
          return (
            <Card
              key={item.id}
              className={cn(
                'group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 hover:border-primary/30',
                selectedItem?.id === item.id && 'ring-2 ring-primary/40 border-primary/50'
              )}
              onClick={() => handleCardClick(item)}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <CardContent className="p-0">
                {/* Image container */}
                <div
                  className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/40 to-muted/10 flex items-center justify-center p-2 sm:p-3 min-w-0"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}0A, ${item.color}04)`
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 max-w-full max-h-full drop-shadow-sm"
                  />
                  {/* Category badge */}
                  <div
                    className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full text-[9px] font-semibold text-white shadow-sm backdrop-blur-sm"
                    style={{ backgroundColor: `${item.color}CC` }}
                  >
                    {item.category}
                  </div>
                  {/* Reviewed checkmark */}
                  {reviewed && (
                    <div className="absolute top-1.5 left-1.5 bg-emerald-500 rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                {/* Text content */}
                <div className="p-2.5 space-y-1">
                  <div className="flex items-start gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full mt-1 flex-shrink-0 ring-1 ring-inset"
                      style={{ backgroundColor: item.color, '--tw-ring-color': `${item.color}40` } as React.CSSProperties}
                    />
                    <h4 className="text-xs sm:text-sm font-semibold leading-tight line-clamp-2 break-words">{item.name}</h4>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2 break-words">
                    {item.purpose}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
            <Search className="w-8 h-8 text-muted-foreground/30" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">No equipment found</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Try adjusting your search or filter</p>
        </div>
      )}

      {/* ===== Equipment Detail Sheet ===== */}
      <Sheet open={sheetOpen} onOpenChange={(open) => { setSheetOpen(open); if (!open) setSelectedItem(null) }}>
        <SheetContent side="right" className="sm:max-w-lg w-full p-0 overflow-y-auto">
          {selectedItem && (
            <div className="flex flex-col">
              {/* Color bar at top */}
              <div
                className="h-2 flex-shrink-0"
                style={{ background: `linear-gradient(90deg, ${selectedItem.color}, ${selectedItem.color}88)` }}
              />

              {/* Equipment image */}
              <div className="flex-shrink-0">
                <div
                  className="mx-4 mt-4 rounded-xl overflow-hidden flex items-center justify-center p-5 border border-border/30 aspect-[4/3]"
                  style={{
                    background: `linear-gradient(135deg, ${selectedItem.color}10, ${selectedItem.color}05)`
                  }}
                >
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-contain max-w-full drop-shadow-lg"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 px-4 pb-6 space-y-4 mt-4">
                {/* Name & Category */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 ring-2 ring-offset-1 ring-offset-background"
                      style={{ backgroundColor: selectedItem.color, '--tw-ring-color': `${selectedItem.color}40` } as React.CSSProperties}
                    />
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-2.5 py-0.5 font-semibold"
                      style={{
                        backgroundColor: `${selectedItem.color}15`,
                        color: selectedItem.color,
                        borderColor: `${selectedItem.color}30`
                      }}
                    >
                      {selectedItem.category}
                    </Badge>
                    {isReviewed && (
                      <Badge variant="secondary" className="text-[10px] px-2.5 py-0.5 font-semibold bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {t('equip.reviewed' as any)}
                      </Badge>
                    )}
                  </div>
                  <SheetTitle className="font-bold text-lg sm:text-xl leading-tight break-words">
                    {selectedItem.name}
                  </SheetTitle>
                  <SheetDescription className="mt-1 text-sm leading-relaxed break-words">
                    {selectedItem.purpose}
                  </SheetDescription>
                </div>

                {/* Specifications Grid */}
                {selectedItem.specifications && Object.keys(selectedItem.specifications).length > 0 && (
                  <div>
                    <h4 className="heading-section text-sm font-semibold flex items-center gap-2 mb-3">
                      <Ruler className="w-4 h-4" style={{ color: selectedItem.color }} />
                      {t('equip.specifications' as any)}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(selectedItem.specifications).map(([key, value]) => (
                        <div
                          key={key}
                          className="rounded-lg border p-2.5"
                          style={{
                            backgroundColor: `${selectedItem.color}05`,
                            borderColor: `${selectedItem.color}15`,
                          }}
                        >
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{key}</p>
                          <p className="text-xs font-medium leading-snug break-words">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* When to Use */}
                {selectedItem.whenToUse && selectedItem.whenToUse.length > 0 && (
                  <div>
                    <h4 className="heading-section text-sm font-semibold flex items-center gap-2 mb-3">
                      <ClipboardList className="w-4 h-4 text-teal-500" />
                      {t('equip.whenToUse' as any)}
                    </h4>
                    <ul className="space-y-1.5">
                      {selectedItem.whenToUse.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-teal-500 flex-shrink-0" />
                          <span className="leading-relaxed break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Safety Notes */}
                {selectedItem.safetyNotes && selectedItem.safetyNotes.length > 0 && (
                  <div>
                    <h4 className="heading-section text-sm font-semibold flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      {t('equip.safetyNotes' as any)}
                    </h4>
                    <div className="space-y-1.5">
                      {selectedItem.safetyNotes.map((note, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm rounded-lg border p-2.5 bg-amber-500/5 border-amber-500/15"
                        >
                          <Shield className="w-3.5 h-3.5 mt-0.5 text-amber-500 flex-shrink-0" />
                          <span className="leading-relaxed break-words">{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mark as Reviewed Button */}
                <button
                  className={cn(
                    'w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2',
                    isReviewed
                      ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 cursor-default'
                      : 'btn-glow-teal text-white cursor-pointer'
                  )}
                  onClick={() => {
                    if (!isReviewed && selectedItem) {
                      markEquipmentReviewed(selectedItem.id)
                    }
                  }}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isReviewed ? t('equip.reviewed' as any) : t('equip.markReviewed' as any)}
                </button>

                {/* Related Equipment */}
                {relatedEquipment.length > 0 && (
                  <div>
                    <h4 className="heading-section text-sm font-semibold flex items-center gap-2 mb-3">
                      <Wrench className="w-4 h-4 text-muted-foreground" />
                      {t('equip.relatedEquipment' as any)}
                    </h4>
                    <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                      {relatedEquipment.map((related) => (
                        <button
                          key={related.id}
                          className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border border-border/40 bg-muted/30 hover:bg-muted/60 transition-all text-left min-w-0 max-w-[180px]"
                          onClick={() => setSelectedItem(related)}
                        >
                          <div
                            className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center p-1"
                            style={{ backgroundColor: `${related.color}10` }}
                          >
                            <img
                              src={related.image}
                              alt={related.shortName}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] font-semibold leading-tight truncate">{related.shortName}</p>
                            <p className="text-[9px] text-muted-foreground truncate">{related.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                  <button
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 py-1.5 px-3 rounded-lg hover:bg-muted/50"
                    onClick={() => navigateEquipment('prev')}
                  >
                    <ChevronLeft className="w-3 h-3" />
                    {t('equip.previous' as any)}
                  </button>
                  <span className="text-[10px] text-muted-foreground font-medium tabular-nums">
                    {equipmentData.findIndex(e => e.id === selectedItem.id) + 1} / {equipmentData.length}
                  </span>
                  <button
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 py-1.5 px-3 rounded-lg hover:bg-muted/50"
                    onClick={() => navigateEquipment('next')}
                  >
                    {t('equip.next' as any)}
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

// ==================== INFOGRAPHICS ====================
interface InfographicImage {
  id: string
  title: string
  category: string
  src: string
  color: string
}

const infographics: InfographicImage[] = [
  {
    id: 'aha-2025-cpr-flowchart',
    title: 'AHA 2025 CPR Flowchart',
    category: 'CPR',
    src: '/infographics/aha_2025_cpr_flowchart_1.jpg',
    color: '#EF4444',
  },
  {
    id: 'aed-operation-steps',
    title: 'AED Operation Steps',
    category: 'CPR',
    src: '/infographics/aed_operation_steps_1.jpg',
    color: '#3B82F6',
  },
  {
    id: 'chain-of-survival',
    title: 'Chain of Survival',
    category: 'CPR',
    src: '/infographics/chain_of_survival_infographic_1.jpg',
    color: '#DC2626',
  },
  {
    id: 'start-triage-flowchart',
    title: 'START Triage Flowchart',
    category: 'Triage',
    src: '/infographics/start_triage_flowchart_1.jpg',
    color: '#F59E0B',
  },
  {
    id: 'patient-assessment-flowchart',
    title: 'Patient Assessment Flowchart',
    category: 'Assessment',
    src: '/infographics/patient_assessment_flowchart_1.jpg',
    color: '#3B82F6',
  },
  {
    id: 'primary-secondary-survey',
    title: 'Primary & Secondary Survey',
    category: 'Assessment',
    src: '/infographics/ems_primary_secondary_survey_infographic_1.jpg',
    color: '#6366F1',
  },
  {
    id: 'trauma-assessment-flowchart',
    title: 'Trauma Assessment Flowchart',
    category: 'Trauma',
    src: '/infographics/trauma_assessment_flowchart_2.jpg',
    color: '#F97316',
  },
  {
    id: 'immobilization-splinting',
    title: 'Immobilization & Splinting',
    category: 'Trauma',
    src: '/infographics/immobilization_splinting_infographic_2.jpg',
    color: '#DC2626',
  },
  {
    id: 'airway-management',
    title: 'Airway Management',
    category: 'First Aid',
    src: '/infographics/airway_management_infographic_2.jpg',
    color: '#22C55E',
  },
  {
    id: 'ems-emergency-response',
    title: 'EMS Emergency Response',
    category: 'First Aid',
    src: '/infographics/1778208113904.png',
    color: '#10B981',
  },
  {
    id: 'tesda-ems-equipment-guide-part1',
    title: 'TESDA EMS Equipment Guide (Part 1)',
    category: 'Equipment',
    src: '/infographics/tesda_ems_equipment_guide_part1_1.png',
    color: '#8B5CF6',
  },
  {
    id: 'tesda-ems-equipment-guide-part2',
    title: 'TESDA EMS Equipment Guide (Part 2)',
    category: 'Equipment',
    src: '/infographics/tesda_ems_equipment_guide_part2_1.png',
    color: '#7C3AED',
  },
  {
    id: 'triage-system-mci',
    title: 'Triage System & Mass Casualty Incidents',
    category: 'Triage',
    src: '/infographics/triage_system_mci_infographic_1.jpg',
    color: '#F59E0B',
  },
  {
    id: 'ems-ncii-creative-poster-1',
    title: 'EMS NCII Creative Poster',
    category: 'General',
    src: '/infographics/ems_ncii_creative_poster_1.png',
    color: '#2EC4B6',
  },
  {
    id: 'ems-ncii-creative-poster-2',
    title: 'EMS NCII Overview Poster',
    category: 'General',
    src: '/infographics/ems_ncii_creative_poster_2.png',
    color: '#1E3A5F',
  },
]

const infographicCategories = ['All', 'CPR', 'First Aid', 'Triage', 'Assessment', 'Trauma', 'Equipment', 'General']

const categoryColors: Record<string, string> = {
  'CPR': '#EF4444',
  'First Aid': '#22C55E',
  'Triage': '#F59E0B',
  'Assessment': '#3B82F6',
  'Trauma': '#F97316',
  'Equipment': '#8B5CF6',
  'General': '#2EC4B6',
}

// ==================== Fullscreen Image Viewer ====================
function FullscreenViewer({
  infographics,
  initialIndex,
  open,
  onClose,
}: {
  infographics: InfographicImage[]
  initialIndex: number
  open: boolean
  onClose: () => void
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + infographics.length) % infographics.length)
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % infographics.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, infographics.length, onClose])

  const currentInfographic = infographics[currentIndex]

  const handleDownload = useCallback(() => {
    const link = document.createElement('a')
    link.href = currentInfographic.src
    link.download = currentInfographic.src.split('/').pop() || 'infographic'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [currentInfographic.src])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + infographics.length) % infographics.length)
  }, [infographics.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % infographics.length)
  }, [infographics.length])

  if (!currentInfographic) return null

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose() }}>
      <DialogContent
        className="max-w-[95vw] max-h-[95vh] p-0 border-0 bg-black/95 overflow-hidden flex flex-col"
        showCloseButton={false}
      >
        {/* Top bar with close and download buttons */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-3 bg-gradient-to-b from-black/60 to-transparent">
          <Badge
            variant="outline"
            className="text-[10px] font-medium border-white/30 text-white/80 bg-black/40 backdrop-blur-sm"
          >
            {currentInfographic.category}
          </Badge>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 text-white/80 hover:text-white hover:bg-white/20 rounded-full"
              onClick={handleDownload}
              title="Download"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 p-0 text-white/80 hover:text-white hover:bg-white/20 rounded-full"
              onClick={onClose}
              title="Close"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Navigation arrows */}
        {infographics.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 p-0 text-white/70 hover:text-white hover:bg-white/20 rounded-full"
              onClick={goToPrev}
              title="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 p-0 text-white/70 hover:text-white hover:bg-white/20 rounded-full"
              onClick={goToNext}
              title="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        {/* Image area - scrollable */}
        <div className="flex-1 overflow-auto flex items-center justify-center min-h-0 p-4 pt-14 pb-14">
          <Image
            src={currentInfographic.src}
            alt={currentInfographic.title}
            width={1536}
            height={2752}
            className="max-h-full w-auto object-contain rounded-sm"
            priority
            unoptimized
          />
        </div>

        {/* Bottom bar with title */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex items-center justify-between gap-3">
            <DialogTitle className="text-white text-sm font-medium truncate m-0">
              {currentInfographic.title}
            </DialogTitle>
            <span className="text-white/50 text-xs flex-shrink-0">
              {currentIndex + 1} / {infographics.length}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function InfographicGallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)

  const filtered = activeCategory === 'All' ? infographics : infographics.filter((ig) => ig.category === activeCategory)

  const openViewer = useCallback((index: number) => {
    setViewerIndex(index)
    setViewerOpen(true)
  }, [])

  const closeViewer = useCallback(() => {
    setViewerOpen(false)
  }, [])

  return (
    <div className="content-transition space-y-4 overflow-hidden w-full">
      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {infographicCategories.map((cat) => {
          const color = categoryColors[cat]
          return (
            <button
              key={cat}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border',
                activeCategory === cat
                  ? 'text-white shadow-sm'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted border-border/40'
              )}
              style={activeCategory === cat ? {
                background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                borderColor: `${color}40`,
              } : undefined}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* Gallery grid - portrait thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {filtered.map((ig, index) => (
          <Card
            key={ig.id}
            className="cursor-pointer transition-all duration-300 overflow-hidden group p-0 gap-0 border-border/50 hover:shadow-lg hover:-translate-y-0.5 hover:border-border"
            onClick={() => openViewer(index)}
          >
            {/* Portrait thumbnail */}
            <div className="relative aspect-[3/4] overflow-hidden bg-muted/30">
              <Image
                src={ig.src}
                alt={ig.title}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                unoptimized
              />
              {/* Bottom gradient overlay with title */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-10 pb-2.5 px-3">
                <h3 className="text-white text-xs sm:text-sm font-semibold leading-tight line-clamp-2">
                  {ig.title}
                </h3>
              </div>
              {/* Category badge */}
              <div className="absolute top-2 right-2">
                <Badge
                  variant="outline"
                  className="text-[9px] sm:text-[10px] font-medium border-white/30 text-white/90 bg-black/40 backdrop-blur-sm px-1.5 py-0"
                  style={{ borderColor: `${ig.color}60` }}
                >
                  {ig.category}
                </Badge>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Fullscreen viewer */}
      <FullscreenViewer
        infographics={filtered}
        initialIndex={viewerIndex}
        open={viewerOpen}
        onClose={closeViewer}
      />
    </div>
  )
}

// ==================== VISUAL SECTION ====================
export function VisualSection() {
  const { activeSubSection, setActiveSubSection } = useAppStore()
  const [diagramType, setDiagramType] = useState<DiagramType>('body')

  const diagramOptions: { type: DiagramType; label: string; icon: React.ReactNode; color: string }[] = [
    { type: 'body', label: 'Human Body', icon: <Activity className="w-4 h-4" />, color: '#6366F1' },
    { type: 'heart', label: 'Heart', icon: <Heart className="w-4 h-4" />, color: '#EF4444' },
    { type: 'airway', label: 'Airway', icon: <Wind className="w-4 h-4" />, color: '#3B82F6' },
    { type: 'pulse', label: 'Pulse Points', icon: <Activity className="w-4 h-4" />, color: '#EF4444' },
    { type: 'brain', label: 'Brain', icon: <Brain className="w-4 h-4" />, color: '#8B5CF6' },
  ]

  return (
    <Tabs
      value={activeSubSection || 'equipment'}
      onValueChange={(v) => setActiveSubSection(v)}
      className="content-transition overflow-hidden w-full"
    >
      <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap scrollbar-none">
        <TabsTrigger value="diagrams" className="text-xs sm:text-sm flex-shrink-0 gap-1 px-2 sm:px-3 data-[state=active]:bg-ems-teal/15 data-[state=active]:text-ems-teal"><Scan className="w-3.5 h-3.5" />Diagrams</TabsTrigger>
        <TabsTrigger value="equipment" className="text-xs sm:text-sm flex-shrink-0 gap-1 px-2 sm:px-3 data-[state=active]:bg-ems-amber/15 data-[state=active]:text-ems-amber"><Wrench className="w-3.5 h-3.5" />Equipment</TabsTrigger>
        <TabsTrigger value="infographics" className="text-xs sm:text-sm flex-shrink-0 gap-1 px-2 sm:px-3 data-[state=active]:bg-ems-navy/15 data-[state=active]:text-ems-navy"><LayoutGrid className="w-3.5 h-3.5" />Infographics</TabsTrigger>
      </TabsList>
      <TabsContent value="diagrams">
        <div className="space-y-4">
          {/* Diagram type selector - enhanced with color indicators */}
          <div className="flex flex-wrap gap-2">
            {diagramOptions.map((d) => (
              <button
                key={d.type}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all border',
                  diagramType === d.type
                    ? 'text-white shadow-md'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted border-border/40 hover:border-border/60'
                )}
                style={diagramType === d.type ? {
                  background: `linear-gradient(135deg, ${d.color}, ${d.color}CC)`,
                  borderColor: `${d.color}60`,
                } : undefined}
                onClick={() => setDiagramType(d.type)}
              >
                {d.icon} {d.label}
              </button>
            ))}
          </div>
          <InteractiveDiagram type={diagramType} />
        </div>
      </TabsContent>
      <TabsContent value="equipment">
        <EquipmentGallery />
      </TabsContent>
      <TabsContent value="infographics">
        <InfographicGallery />
      </TabsContent>
    </Tabs>
  )
}
