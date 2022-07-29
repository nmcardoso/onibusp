import MapControllerButton from './MapControllerButton'
import { RiMapPinAddFill } from 'react-icons/ri'

export default function AddLineController() {
  return (
    <MapControllerButton style={{ fontSize: '21px' }}>
      <RiMapPinAddFill />
    </MapControllerButton>
  )
}