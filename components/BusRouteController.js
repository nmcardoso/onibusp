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
import CheckIcon from './CheckIcon'
import { BackButton } from './BackButton'
import { isMobile } from '../utils/responsive'

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
  const toggleDrawer = () => setDrawerState(!isDrawerOpen)
  const handleClick = (e, key) => {
    e.stopPropagation()
    appDispatch({
      type: 'toggleBusRoute',
      payload: {
        id: parseInt(key),
        show: !appState.control[parseInt(key)].route
      }
    })
  }

  return (
    <NonBubblingComponent prevent={isDrawerOpen}>
      <MapControllerButton
        style={{ fontSize: '20px' }}
        onClick={toggleDrawer}>
        <TbRoute />
      </MapControllerButton>

      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        direction="left"
        style={{ cursor: 'auto' }}
        size={isMobile ? '240px' : '265px'}
        duration={300}
        className="drawer">
        <div className="is-flex is-align-content-center px-2 py-2 mb-0 border-b">
          <BackButton onClick={toggleDrawer} />
          <p
            style={{ fontSize: '1.12rem' }}
            className="ml-1 my-auto">
            Selecionar Rotas
          </p>
        </div>

        {Object.entries(BUS_LINES).map(([key, value]) => (
          <div
            key={key}
            className={`is-flex is-align-content-center border-b mx-0 py-3 px-2 ${styles.item}`}
            onClick={e => handleClick(e, key)}>
            <img
              alt=""
              width="13px"
              src={`/assets/img/marker-${value.iconColor}.svg`} />
            <span
              className="ml-1 my-auto is-flex-grow-1"
              style={{ fontSize: '0.88rem' }}>
              {value.displayName}
            </span>
            <CheckIcon
              outline={true}
              active={appState.control[parseInt(key)].route} />
          </div>
        ))}
      </Drawer>
    </NonBubblingComponent>
  )
}