/* eslint-disable @next/next/no-img-element */
import { TbRoute } from 'react-icons/tb'
import MapControllerButton from './MapControllerButton'
import Drawer from 'react-modern-drawer'
import { BUS_LINES } from '../utils/constants'
import { MdCheck, MdClose } from 'react-icons/md'
import styles from '../styles/BusLineController.module.scss'
import { useState, useContext } from 'react'
import { store } from '../utils/store'
import NonBubblingComponent from './NonBubblingComponent'

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

export default function BusRouteController() {
  const appContext = useContext(store)
  const { appState, appDispatch } = appContext
  const [isDrawerOpen, setDrawerState] = useState(false)

  return (
    <NonBubblingComponent>
      <MapControllerButton
        style={{ fontSize: '20px' }}
        onClick={() => setDrawerState(!isDrawerOpen)}>
        <TbRoute />
      </MapControllerButton>

      <Drawer
        open={isDrawerOpen}
        onClose={() => setDrawerState(!isDrawerOpen)}
        direction='left'
        style={{ cursor: 'auto' }}
        size='265px'
        duration={300}
      >
        <p className="is-size-5 px-2 pt-1 pb-3 mb-3 border-b">
          Selecionar Rotas
        </p>

        {Object.entries(BUS_LINES).map(([key, value]) => (
          <div
            key={key}
            className={`columns is-mobile is-vcentered is-variable is-1 border-b mx-0 ${styles.item}`}
            onClick={(e) => {
              e.stopPropagation()
              appDispatch({
                type: 'toggleBusRoute',
                payload: {
                  id: parseInt(key),
                  show: !appState.control[parseInt(key)].route
                }
              })
            }}
          >
            <div className="column">
              <div className="is-flex is-align-content-center">
                <img
                  alt=""
                  width="13px"
                  src={`/assets/img/marker-${value.iconColor}.svg`} />
                <span className="ml-1" style={{ fontSize: '0.88rem' }}>
                  {value.displayName}
                </span>
              </div>
            </div>
            <div className="column is-2">
              <ToggleButton
                active={appState.control[parseInt(key)].route}
                onClick={() => { }} />
            </div>
          </div>
        ))}
      </Drawer>
    </NonBubblingComponent>
  )
}