/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from 'react'
import { RiMapPinAddFill } from 'react-icons/ri'
import { BUS_LINES } from '../utils/constants'
import MapControllerButton from './MapControllerButton'
import { store } from '../utils/store'
import Drawer from 'react-modern-drawer'
import styles from '../styles/BusLineController.module.scss'
import NonBubblingComponent from './NonBubblingComponent'
import CheckIcon from './CheckIcon'
import { useMobile } from '../utils/responsive'
import { BackButton } from './BackButton'


export default function BusLineController() {
  const appContext = useContext(store)
  const { appState, appDispatch } = appContext
  const [isDrawerOpen, setDrawerState] = useState(false)
  const isMobile = useMobile()
  const toggleDrawer = () => setDrawerState(!isDrawerOpen)
  const handleClick = (e, key) => {
    e.stopPropagation()
    appDispatch({
      type: 'toggleBusLine',
      payload: {
        id: parseInt(key),
        show: !appState.control[parseInt(key)].bus
      }
    })
  }

  return (
    <NonBubblingComponent prevent={isDrawerOpen}>
      <MapControllerButton
        style={{ fontSize: '21px' }}
        onClick={toggleDrawer}>
        <RiMapPinAddFill />
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
            Selecionar Linhas
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
              active={appState.control[parseInt(key)].bus} />
          </div>
        ))}
      </Drawer>
    </NonBubblingComponent>
  )
}