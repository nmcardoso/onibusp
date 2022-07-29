import { useContext, useState } from 'react'
import { RiMapPinAddFill } from 'react-icons/ri'
import { MdCheck, MdClose } from 'react-icons/md'
import { BUS_LINES } from '../utils/constants'
import MapControllerButton from './MapControllerButton'
import Modal from './Modal'
import { store } from '../utils/store'


const ToggleButton = ({ active, onClick }) => {
  return (
    <button
      className={`button px-2 is-small ${active ? 'is-success' : 'is-danger'}`}
      style={{ height: '2.3em' }}
      onClick={onClick}>
      <span style={{ fontSize: '14px', lineHeight: '9px' }}>
        {active ? <MdCheck /> : <MdClose />}
      </span>
    </button>
  )
}


export default function BusLineController() {
  const [showModal, setShowModal] = useState(false)
  const toggleModalState = () => setShowModal(!showModal)
  const appContext = useContext(store)
  const { appState, appDispatch } = appContext

  const lines = Object.entries(BUS_LINES).map(([key, value], i) => (
    <div key={i} className="columns is-vcentered is-variable is-1 border-t">
      <div className="column">
        <div className="is-flex is-align-content-center">
          <img alt="" width="14px" src={`/assets/img/marker-${value.iconColor}.svg`} />
          <span className="ml-2 is-size-6"> {value.displayName}</span>
        </div>
      </div>
      <div className="column is-2 is-flex is-justify-content-center">
        <ToggleButton
          active={appState.control[parseInt(key)].bus}
          onClick={(e) => {
            e.stopPropagation()
            appDispatch({
              type: 'toggleBusLine',
              payload: {
                id: parseInt(key),
                show: !appState.control[parseInt(key)].bus
              }
            })
          }} />
      </div>
      <div className="column is-2 is-flex is-justify-content-center">
        <ToggleButton
          active={appState.control[parseInt(key)].route}
          onClick={(e) => {
            e.stopPropagation()
            appDispatch({
              type: 'toggleBusRoute',
              payload: {
                id: parseInt(key),
                show: !appState.control[parseInt(key)].route
              }
            })
          }} />
      </div>
    </div>
  ))

  return (
    <>
      <MapControllerButton style={{ fontSize: '21px' }} onClick={toggleModalState}>
        <RiMapPinAddFill />
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