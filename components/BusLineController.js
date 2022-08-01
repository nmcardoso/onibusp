import { useContext, useState } from 'react'
import { RiMapPinAddFill } from 'react-icons/ri'
import { BL_UNIQUE } from '../utils/constants'
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
        {BL_UNIQUE.map(({ lineId, iconColor, displayName }) => (
          <MyDrawer.IconSplitPane
            key={lineId}
            onClick={e => handleClick(e, lineId)}
            active={appState.control[lineId].bus}
            imgSrc={`/assets/img/marker-${iconColor}.svg`}>
            <span
              className="ml-1"
              style={{ fontSize: '0.88rem' }}>
              {displayName}
            </span>
          </MyDrawer.IconSplitPane>
        ))}
      </MyDrawer>
    </NonBubblingComponent>
  )
}