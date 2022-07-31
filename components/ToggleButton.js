import { MdCancel, MdOutlineCancel, MdCheckCircle, MdCheckCircleOutline } from 'react-icons/md'

export default function ToggleButton({ active, onClick }) {
  return (
    <button
      className={`button px-2 is-small ${active ? 'is-success' : 'is-danger'}`}
      style={{ height: '2.3em' }}
      onClick={onClick}>
      <span style={{ fontSize: '14px', lineHeight: '9px' }}>
        {active ? <MdCheckCircle /> : <MdCancel />}
      </span>
    </button>
  )
}