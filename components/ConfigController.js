import MapControllerButton from './MapControllerButton'
import { BsGearFill } from 'react-icons/bs'
import NonBubblingComponent from './NonBubblingComponent'
import { useContext, useState } from 'react'
import { store } from '../utils/store'
import * as pkgInfo from '../package.json'
import { APP_NAME } from '../utils/constants'
import MyDrawer from './MyDrawer'


const About = () => (
  <div className="mx-2 mt-1">
    <p><b>{APP_NAME} v{pkgInfo.version}</b></p>
    <p>
      Este é um aplicativo de código aberto hospedado{' '}
      <a
        href="https://github.com/bususp/bususp"
        target="_BLANK"
        rel="noreferrer">
        neste repositório
      </a>{' '}
      do Github. Sinta-se a vontade em enviar contribuição de código.
      Caso tenha encontrado algum bug ou tenha alguma sujestão, envie {' '}
      <a
        href="https://github.com/bususp/bususp/issues/new"
        target="_BLANK"
        rel="noreferrer">
        neste link
      </a>.
    </p>
    <p><b>Licença:</b> GNU-GPLv3.0</p>
    <p>
      <b>Agradecimentos:</b> Este aplicativo foi criado usando várias{' '}
      bibliotecas de código aberto como <i>Leaflet</i>, <i>React</i> e <i>Nextjs</i>{' '}
      e está acessível a todos graças aos serviços de hospedagem do <i>Vercel</i>{' '}
      e dos webservices disponibilizados por <i>OpenStreetMap</i> e <i>SPTrans</i>.
    </p>
  </div>
)


const configs = [
  ['showZoomController', 'Mostrar botão de zoom'],
  ['showBusLineController', 'Mostrat botão de linhas'],
  ['showBusRouteController', 'Mostrat botão de rotas']
]


export default function ConfigController() {
  const appContext = useContext(store)
  const { appState, appDispatch } = appContext
  const [isDrawerOpen, setDrawerState] = useState(false)
  const toggleDrawer = () => setDrawerState(!isDrawerOpen)
  const handleClick = (config) => appDispatch({
    type: 'toggleConfig',
    payload: {
      config: config,
      value: !appState.config[config]
    }
  })

  return (
    <NonBubblingComponent>
      <MapControllerButton style={{ fontSize: '19px' }} onClick={toggleDrawer}>
        <BsGearFill />
      </MapControllerButton>

      <MyDrawer
        title="Configurações"
        open={isDrawerOpen}
        onClose={toggleDrawer}>
        <MyDrawer.Heading className="mt-3">
          Interface de Usuário
        </MyDrawer.Heading>
        {configs.map(([param, desc]) => (
          <MyDrawer.IconSplitPane
            key={param}
            onClick={() => handleClick(param)}
            active={appState.config[param]}>
            <span style={{ fontSize: '0.88rem' }}>
              {desc}
            </span>
          </MyDrawer.IconSplitPane>
        ))}

        <MyDrawer.Heading className="mt-3">
          Sobre
        </MyDrawer.Heading>
        <About />

        {/* <MyDrawer.Heading className="mt-3">
          Instale o aplicativo
        </MyDrawer.Heading> */}
      </MyDrawer>
    </NonBubblingComponent >
  )
}