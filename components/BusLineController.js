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
  const handleClick = (e, lineId) => {
    e.stopPropagation()
    appDispatch({
      type: 'toggleLayer',
      payload: {
        lineId: parseInt(lineId),
        transform: ~appState.layers.busPosition.indexOf(lineId) ? 'remove' : 'add',
        layer: 'busPosition'
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
            active={~appState.layers.busPosition.indexOf(lineId)}
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