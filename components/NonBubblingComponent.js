import L from 'leaflet'
import { useRef } from 'react'

export default function NonBubblingComponent({
  children,
  style = {},
  className = {},
  prevent = true
}) {
  const r = useRef(null)

  if (r.current && prevent) {
    L.DomEvent.disableClickPropagation(r.current)
    L.DomEvent.disableScrollPropagation(r.current)
  }

  return (
    <div
      style={style}
      className={className}
      ref={r}>
      {children}
    </ div>
  )
}