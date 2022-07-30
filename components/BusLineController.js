import { useContext, useState } from 'react'
import { RiMapPinAddFill } from 'react-icons/ri'
import { MdCheck, MdClose } from 'react-icons/md'
import { BUS_LINES } from '../utils/constants'
import MapControllerButton from './MapControllerButton'
import { store } from '../utils/store'
import Drawer from 'react-modern-drawer'
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
  const appContext = useContext(store)
  const { appState, appDispatch } = appContext
  const [isDrawerOpen, setDrawerState] = useState(false)

  return (
    <>
      <MapControllerButton
        style={{ fontSize: '21px' }}
        onClick={() => setDrawerState(true)}>
        <RiMapPinAddFill />
      </MapControllerButton>

      <Drawer
        open={isDrawerOpen}
        onClose={() => setDrawerState(false)}
        direction='left'
        style={{ cursor: 'auto' }}
        size="265px"
        duration={300}
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
                <span className="ml-1" style={{ fontSize: '0.88rem' }}>
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
    </>
  )
}