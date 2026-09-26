import React, { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  maxWidth?: string
}

export function Modal({ isOpen, onClose, children, maxWidth = '640px' }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content"
        style={{ maxWidth }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="modal-close-btn font-mono"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
