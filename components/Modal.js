import { useState } from 'react'

export default function Modal({ title, active, children, onClose }) {
  return (
    <div className={`modal pointer-events ${active ? 'is-active' : ''}`} style={{ cursor: 'auto' }}>
      <div className="modal-background"></div>
      <div className="modal-card pointer-events">
        <header className="modal-card-head py-4">
          <p className="modal-card-title">{title}</p>
          <button
            className="delete"
            aria-label="close"
            onClick={onClose} />
        </header>
        <section className="modal-card-body pointer-events">
          {children}
        </section>
      </div>
    </div>
  )
}