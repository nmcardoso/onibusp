import { useContext, useState } from 'react'
import { RiMapPinAddFill } from 'react-icons/ri'
import { MdCheck, MdClose } from 'react-icons/md'
import { BUS_LINES } from '../utils/constants'
import MapControllerButton from './MapControllerButton'
import Modal from './Modal'
import { store } from '../utils/store'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import styles from '../styles/BusLineController.module.scss'


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

      <Drawer
        open={showModal}
        onClose={toggleModalState}
        direction='left'
        style={{ cursor: 'auto' }}
        size="290px"
      >
        <p className="is-size-5 px-2 pt-1 pb-3 mb-3 border-b">Mostrar Linhas</p>
        {Object.entries(BUS_LINES).map(([key, value]) => (
          <div
            key={key}
            className={`columns is-mobile is-vcentered is-variable is-1 border-b mx-0 ${styles.item}`}
            onClick={(e) => {
              e.stopPropagation()
              appDispatch({
                type: 'toggleBusLine',
                payload: {
                  id: parseInt(key),
                  show: !appState.control[parseInt(key)].bus
                }
              })
            }}
          >
            <div className="column">
              <div className="is-flex is-align-content-center">
                <img
                  alt=""
                  width="14px"
                  src={`/assets/img/marker-${value.iconColor}.svg`} />
                <span className="ml-2 is-size-6">
                  {value.displayName}
                </span>
              </div>
            </div>
            <div className="column is-2">
              <ToggleButton
                active={appState.control[parseInt(key)].bus}
                onClick={() => { }} />
            </div>
          </div>
        ))}
      </Drawer>

      {/* <Modal title="Linhas" active={showModal} onClose={toggleModalState}>
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
      </Modal> */}
    </>
  )
}