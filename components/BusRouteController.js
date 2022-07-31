import { TbRoute } from 'react-icons/tb'
import MapControllerButton from './MapControllerButton'
import { BUS_LINES } from '../utils/constants'
import { MdCheck, MdClose } from 'react-icons/md'
import { useState, useContext } from 'react'
import { store } from '../utils/store'
import NonBubblingComponent from './NonBubblingComponent'
import MyDrawer from './MyDrawer'


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

      <MyDrawer
        title="Selecionar Rotas"
        open={isDrawerOpen}
        onClose={toggleDrawer}>
        {Object.entries(BUS_LINES).map(([key, value]) => (
          <MyDrawer.IconSplitPane
            key={key}
            onClick={e => handleClick(e, key)}
            active={appState.control[parseInt(key)].route}
            imgSrc={`/assets/img/marker-${value.iconColor}.svg`}>
            <span
              className="ml-1"
              style={{ fontSize: '0.88rem' }}>
              {value.displayName}
            </span>
          </MyDrawer.IconSplitPane>
        ))}
      </MyDrawer>
    </NonBubblingComponent>
  )
}