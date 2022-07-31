import { useContext, useState } from 'react'
import { RiMapPinAddFill } from 'react-icons/ri'
import { BUS_LINES } from '../utils/constants'
import MapControllerButton from './MapControllerButton'
import { store } from '../utils/store'
import MyDrawer from './MyDrawer'
import NonBubblingComponent from './NonBubblingComponent'


export default function BusLineController() {
  const appContext = useContext(store)
  const { appState, appDispatch } = appContext
  const [isDrawerOpen, setDrawerState] = useState(false)
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

      <MyDrawer
        title="Selecionar Linhas"
        open={isDrawerOpen}
        onClose={toggleDrawer}>
        {Object.entries(BUS_LINES).map(([key, value]) => (
          <MyDrawer.IconSplitPane
            key={key}
            onClick={e => handleClick(e, key)}
            active={appState.control[parseInt(key)].bus}
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