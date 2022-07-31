import { MdCancel, MdOutlineCancel, MdCheckCircle, MdCheckCircleOutline } from 'react-icons/md'

export default function CheckIcon({ active, outline = true }) {
  if (outline) {
    return (
      <div className={`is-inline-flex is-align-items-center`}>
        {active ?
          <MdCheckCircleOutline
            className={`${active ? 'has-text-success' : 'has-text-danger'}`}
            size={19} /> :
          <MdOutlineCancel
            className={`${active ? 'has-text-success' : 'has-text-danger'}`}
            size={19} />
        }
      </div>
    )
  } else {
    return (
      <div className={`is-inline-flex is-align-items-center`}>
        {active ?
          <MdCheckCircle
            className={`${active ? 'has-text-success' : 'has-text-danger'}`}
            size={19} /> :
          <MdCancel
            className={`${active ? 'has-text-success' : 'has-text-danger'}`}
            size={19} />
        }
      </div>
    )
  }
}