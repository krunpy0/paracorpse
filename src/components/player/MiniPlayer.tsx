import { useRef, useEffect } from 'react'
import type { Track } from '../../types'
import albumDisgorgement from '../../assets/album-disgorgement.jpg'

interface MiniPlayerProps {
  isPlaying: boolean
  activeTrack: Track
  trackProgress: number
  setTrackProgress: (progress: number) => void
  playerExpanded: boolean
  setPlayerExpanded: (expanded: boolean) => void
  analyserRef: React.RefObject<AnalyserNode | null>
  onTogglePlay: (track: Track) => void
}

export function MiniPlayer({
  isPlaying,
  activeTrack,
  trackProgress,
  setTrackProgress,
  playerExpanded,
  setPlayerExpanded,
  analyserRef,
  onTogglePlay
}: MiniPlayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      animFrameRef.current = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isPlaying && analyserRef.current) {
        const bufferLength = analyserRef.current.frequencyBinCount
        const dataArray = new Uint8Array(bufferLength)
        analyserRef.current.getByteFrequencyData(dataArray)

        const barWidth = 3
        let x = 0
        for (let i = 0; i < 8; i++) {
          const val = dataArray[i * 2] || 30
          const barHeight = Math.max((val / 255) * canvas.height, 3)
          ctx.fillStyle = '#f5f5f3'
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)
          x += barWidth + 3
        }
      } else {
        ctx.fillStyle = '#444444'
        for (let i = 0; i < 8; i++) {
          ctx.fillRect(i * 6, canvas.height - 2, 3, 2)
        }
      }
    }

    draw()
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isPlaying, analyserRef])

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    setTrackProgress(pos)
  }

  return (
    <aside
      className="mini-player-dock"
      aria-label="Audio Apparatus Player"
      style={{
        transform: playerExpanded ? 'translateY(0)' : 'translateY(calc(100% - 10px))',
      }}
    >
      <img
        src={albumDisgorgement}
        alt=""
        className="player-thumb"
      />

      <div className="player-info-center">
        <div className="player-title-row">
          <div className="player-track-name font-mono">
            PARACORPSE — {activeTrack.title}
          </div>
          <div className="player-time font-mono">
            {activeTrack.duration}
          </div>
        </div>

        <div
          className="player-progress-bar"
          onClick={handleScrubberClick}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={1}
          aria-valuenow={trackProgress}
          tabIndex={0}
          aria-label="Track progress"
        >
          <div
            className="player-progress-fill"
            style={{ transform: `scaleX(${trackProgress})` }}
          />
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={50}
        height={20}
        className="audio-visualizer-canvas"
        aria-hidden="true"
      />

      <div className="player-controls-right">
        <button
          onClick={() => onTogglePlay(activeTrack)}
          className="player-btn-circle"
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isPlaying ? '■' : '▶'}
        </button>

        <button
          onClick={() => setPlayerExpanded(!playerExpanded)}
          className="player-sub-btn font-mono"
          aria-label={playerExpanded ? 'Collapse mini player' : 'Expand mini player'}
        >
          {playerExpanded ? '▼' : '▲'}
        </button>
      </div>
    </aside>
  )
}
