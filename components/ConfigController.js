import MapControllerButton from './MapControllerButton'
import { BsGearFill } from 'react-icons/bs'

export default function ConfigController() {
  const handleClick = () => {

  }

  return (
    <MapControllerButton style={{ fontSize: '19px' }} onClick={handleClick}>
      <BsGearFill />
    </MapControllerButton>
  )
}