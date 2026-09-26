import { useState, useRef, useEffect, useCallback } from 'react'
import type { Track } from '../types'
import { RELEASES } from '../data'

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTrack, setActiveTrack] = useState<Track>(RELEASES[0].tracks[0])
  const [trackProgress, setTrackProgress] = useState(0.25)
  const [playerExpanded, setPlayerExpanded] = useState(true)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)

  const startAudioEngine = useCallback((freq: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
      }

      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        ctx.resume()
      }

      if (osc1Ref.current) {
        try { osc1Ref.current.stop() } catch { /* ignore */ }
      }
      if (osc2Ref.current) {
        try { osc2Ref.current.stop() } catch { /* ignore */ }
      }

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime)
      masterGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.6)
      masterGain.connect(ctx.destination)
      gainNodeRef.current = masterGain

      const analyser = ctx.createAnalyser()
      analyser.fftSize = 64
      masterGain.connect(analyser)
      analyserRef.current = analyser

      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(freq, ctx.currentTime)

      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(freq * 1.5, ctx.currentTime)

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(140, ctx.currentTime)

      osc1.connect(filter)
      osc2.connect(filter)
      filter.connect(masterGain)

      osc1.start()
      osc2.start()

      osc1Ref.current = osc1
      osc2Ref.current = osc2
      setIsPlaying(true)
    } catch (e) {
      console.warn('Web Audio synthesis initialization:', e)
      setIsPlaying(true)
    }
  }, [])

  const stopAudioEngine = useCallback(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime)
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
      setTimeout(() => {
        if (osc1Ref.current) {
          try { osc1Ref.current.stop() } catch { /* ignore */ }
        }
        if (osc2Ref.current) {
          try { osc2Ref.current.stop() } catch { /* ignore */ }
        }
        setIsPlaying(false)
      }, 300)
    } else {
      setIsPlaying(false)
    }
  }, [])

  const togglePlayTrack = useCallback((track: Track) => {
    if (isPlaying && activeTrack.id === track.id) {
      stopAudioEngine()
    } else {
      setActiveTrack(track)
      startAudioEngine(track.frequency)
    }
  }, [isPlaying, activeTrack.id, startAudioEngine, stopAudioEngine])

  // Progress ticker while playing
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setTrackProgress(prev => (prev >= 1 ? 0 : prev + 0.005))
    }, 1000)
    return () => clearInterval(interval)
  }, [isPlaying])

  return {
    isPlaying,
    activeTrack,
    trackProgress,
    setTrackProgress,
    playerExpanded,
    setPlayerExpanded,
    analyserRef,
    togglePlayTrack,
    stopAudioEngine
  }
}
