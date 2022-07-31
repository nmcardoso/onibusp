import { MdOutlineArrowBack } from 'react-icons/md'


export function BackButton({ onClick = () => { } }) {
  return (
    <button
      onClick={onClick}
      className="button is-text is-small py-0 px-2">
      <MdOutlineArrowBack size={21} />
    </button>
  )
}