import { useState } from 'react'
import { FaMapSigns } from 'react-icons/fa'
import { MdCheck, MdClose } from 'react-icons/md'
import { BUS_LINES } from '../utils/constants'
import MapControllerButton from './MapControllerButton'
import Modal from './Modal'
import Switch from './Switch'


const ToggleButton = ({ active }) => {
  return (
    <button className={`button px-2 is-small ${active ? 'is-success' : 'is-danger'}`} style={{ height: '2.3em' }}>
      <span style={{ fontSize: '14px', lineHeight: '9px' }}>
        {active ? <MdCheck /> : <MdClose />}
      </span>
    </button>
  )
}


export default function BusRouteController() {
  const [showModal, setShowModal] = useState(false)
  const toggleModalState = () => setShowModal(!showModal)

  const lines = Object.entries(BUS_LINES).map(([key, value], i) => (
    <div key={i} className="columns is-vcentered is-variable is-1 border-t">
      <div className="column">
        <div className="is-flex is-align-content-center">
          <img alt="" width="14px" src={`/assets/img/marker-${value.iconColor}.svg`} />
          <span className="ml-2 is-size-6"> {value.displayName}</span>
        </div>
      </div>
      <div className="column is-2 is-flex is-justify-content-center">
        <ToggleButton active={true} />
      </div>
      <div className="column is-2 is-flex is-justify-content-center">
        <ToggleButton active={false} />
      </div>
    </div>
  ))

  return (
    <>
      <MapControllerButton style={{ fontSize: '17px' }} onClick={toggleModalState}>
        <FaMapSigns />
      </MapControllerButton>

      <Modal title="Linhas" active={showModal} onClose={toggleModalState}>
        <div className="columns is-vcentered is-variable is-1">
          <div className="column py-1">
            <div className="is-flex is-align-content-center">
              <span className="is-size-7">Linha</span>
            </div>
          </div>
          <div className="column is-2 py-1 is-flex is-justify-content-center">
            <span className="is-size-7">Mostrar Posição</span>
          </div>
          <div className="column is-2 py-1 is-flex is-justify-content-center">
            <span className="is-size-7">Mostrar Rota</span>
          </div>
        </div>
        {lines}
      </Modal>
    </>
  )
}