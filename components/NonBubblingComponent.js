import L from 'leaflet'
import { useEffect, useRef } from 'react'

export default function NonBubblingComponent({
  children,
  style = {},
  className = {},
  prevent = true
}) {
  const r = useRef(null)

  useEffect(() => {
    if (r.current && prevent) {
      L.DomEvent.disableClickPropagation(r.current)
      L.DomEvent.disableScrollPropagation(r.current)
    }
  }, [prevent])

  return (
    <div
      style={style}
      className={className}
      ref={r}>
      {children}
    </ div>
  )
}