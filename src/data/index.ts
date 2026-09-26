import type { Release, NewsItem, TourDate, BandMember } from '../types'

import albumDisgorgement from '../assets/album-disgorgement.jpg'
import albumTectonic from '../assets/album-tectonic.jpg'
import albumBasement from '../assets/album-basement.jpg'
import liveStageImg from '../assets/live-stage.jpg'
import bandPortraitImg from '../assets/band-portrait.jpg'
import archiveTapeImg from '../assets/archive-tape.jpg'

export const RELEASES: Release[] = [
  {
    id: 'prc-04',
    catalog: 'PRC-04',
    year: '2026',
    format: '180G OBSIDIAN VINYL / DIGITAL MASTER',
    title: 'DISGORGEMENT OF RESONANCE',
    description: 'A three-movement sonic manifest exploring structural collapse, monolithic percussive resonance, and physical sub-bass saturation. Mastered from 1/2-inch analog tape.',
    artwork: albumDisgorgement,
    tracks: [
      { id: 't1', number: '01', title: 'CAUSTIC EXCAVATION', duration: '05:18', bitrate: '24-bit / 96kHz', frequency: 46.2 },
      { id: 't2', number: '02', title: 'HYDRAULIC CRUSH', duration: '06:44', bitrate: '24-bit / 96kHz', frequency: 52.0 },
      { id: 't3', number: '03', title: 'PALE APPARATUS', duration: '08:12', bitrate: '24-bit / 96kHz', frequency: 38.8 },
      { id: 't4', number: '04', title: 'MONOLITH NULL', duration: '04:50', bitrate: '24-bit / 96kHz', frequency: 49.5 },
    ]
  },
  {
    id: 'prc-02',
    catalog: 'PRC-02',
    year: '2025',
    format: '12" EP · 45 RPM',
    title: 'TECTONIC EXHAUST',
    description: 'Captured live inside decommissioned hydroelectric vaults across northern Italy. Raw mechanical rhythm sections coupled with extreme low-frequency sub-displacement.',
    artwork: albumTectonic,
    tracks: [
      { id: 't5', number: '01', title: 'SEISMIC FRACTURE', duration: '04:32', bitrate: '16-bit / 44.1kHz', frequency: 58.2 },
      { id: 't6', number: '02', title: 'DEEP RUNOFF', duration: '05:40', bitrate: '16-bit / 44.1kHz', frequency: 41.2 },
      { id: 't7', number: '03', title: 'PRESSURE APPARATUS', duration: '06:15', bitrate: '16-bit / 44.1kHz', frequency: 35.0 },
    ]
  },
  {
    id: 'prc-01',
    catalog: 'PRC-01',
    year: '2024',
    format: 'LIMITED CASSETTE DEMO',
    title: 'BASEMENT DRIFT',
    description: 'The genesis archive. Four musicians in an unheated concrete basement with two amplifiers, a raw steel kick drum, and a four-track cassette deck.',
    artwork: albumBasement,
    tracks: [
      { id: 't8', number: '01', title: 'BASEMENT DRIFT (DEMO)', duration: '03:15', bitrate: 'ANALOG CASSETTE', frequency: 65.4 },
      { id: 't9', number: '02', title: 'STATIC FAULT', duration: '04:02', bitrate: 'ANALOG CASSETTE', frequency: 72.0 },
    ]
  }
]

export const NEWS_DATA: NewsItem[] = [
  {
    id: 'n1',
    date: '2026.09.14',
    category: 'NEW SINGLE',
    headline: 'CAUSTIC EXCAVATION (STUDIO MASTER)',
    previewImage: albumDisgorgement,
    caption: 'OFFICIAL AUDIO TRANSMISSION // PRC-04',
    content: 'The lead movement from the upcoming LP DISGORGEMENT OF RESONANCE is now active across all physical and archival channels. Mastered at 24-bit 96kHz with full uncompressed dynamic range.'
  },
  {
    id: 'n2',
    date: '2026.08.28',
    category: 'LIVE PERFORMANCE',
    headline: 'CONCRETE MONUMENTAL SET // MILAN DOCKS',
    previewImage: liveStageImg,
    caption: 'DOCUMENTARY REEL // LIVE RIG APPARATUS',
    content: 'Full quadraphonic sound archive recorded in front of 2,400 attendees in Milan. High-pressure acoustic resonance achieved via bespoke low-frequency horn arrays.'
  },
  {
    id: 'n3',
    date: '2026.07.12',
    category: 'OFFICIAL FILM',
    headline: 'OBSIDIAN SHEAR // DIRECTED BY APPARATUS',
    previewImage: bandPortraitImg,
    caption: '35MM MONOCHROME DOCUMENT',
    content: 'Visual accompaniment captured on 35mm double-X black and white film stock inside brutalist architectural monuments. Directed in collaboration with APPARATUS LAB.'
  },
  {
    id: 'n4',
    date: '2026.05.03',
    category: 'STUDIO DISPATCH',
    headline: 'RECORDING CYCLE DISGORGEMENT COMPLETE',
    previewImage: archiveTapeImg,
    caption: 'ANALOG REEL SESSION // 48-TRACK ARCHIVE',
    content: 'Final master tapes delivered to cutting facility for direct metal mastering (DMM) at 45 RPM. Physical vinyl pressing limited to 500 hand-numbered copies.'
  }
]

export const TOUR_DATES: TourDate[] = [
  { id: 'td1', date: '18 OCT 2026', city: 'MILAN', venue: 'HANGAR BICOCCA SUB-VAULT', status: 'SOLD OUT' },
  { id: 'td2', date: '31 OCT 2026', city: 'BERLIN', venue: 'KRAFTWERK MAIN HALL', status: 'AVAILABLE' },
  { id: 'td3', date: '07 NOV 2026', city: 'PRAGUE', venue: 'MEETFACTORY INDUSTRIAL COMPLEX', status: 'AVAILABLE' },
  { id: 'td4', date: '14 NOV 2026', city: 'LONDON', venue: 'EARTH HALL DOWNS', status: 'AVAILABLE' },
  { id: 'td5', date: '28 SEP 2026', city: 'REYKJAVIK', venue: 'HARPA NORDURLJOS', status: 'ARCHIVED' },
  { id: 'td6', date: '15 AUG 2026', city: 'COPENHAGEN', venue: 'KØDBYEN DEPOT', status: 'ARCHIVED' },
]

export const BAND_MEMBERS: BandMember[] = [
  {
    id: 'm1',
    name: 'D. NOVAL',
    role: 'BASS & SUB-HARMONICS',
    equipment: 'Custom 35" Scale Bass · Ampeg SVT Monolith',
    frequency: '24Hz – 120Hz Sub-tier'
  },
  {
    id: 'm2',
    name: 'V. KAREV',
    role: 'VOCALS & RESONANCE',
    equipment: 'Shure 520DX Capsule · Analog Tape Delay',
    frequency: '60Hz – 3.8kHz Harmonic spectrum'
  },
  {
    id: 'm3',
    name: 'M. SOREN',
    role: 'LEAD GUITAR & FEEDBACK',
    equipment: 'Baritone Solid Body · Dual Sovereign 100W',
    frequency: 'Drop-A Sub-harmonic tuning'
  },
  {
    id: 'm4',
    name: 'A. ROCH',
    role: 'DRUMS & PERCUSSION',
    equipment: 'Bespoke 24" Raw Steel Kick · Hammered Cymbals',
    frequency: 'Tectonic pulse 48 – 210 BPM'
  }
]
