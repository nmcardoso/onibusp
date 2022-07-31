import MapControllerButton from './MapControllerButton'
import { BsGearFill } from 'react-icons/bs'
import NonBubblingComponent from './NonBubblingComponent'
import Drawler from 'react-modern-drawer'
import { useContext, useState } from 'react'
import { store } from '../utils/store'
import { useMobile } from '../utils/responsive'
import { BackButton } from './BackButton'
import { version } from '../package.json'
import { APP_NAME } from '../utils/constants'
import CheckIcon from './CheckIcon'

const ConfigHeading = ({ children, className = '', style = {} }) => {
  return (
    <h2
      className={`px-2 border-b is-uppercase ${className}`}
      style={{
        fontWeight: 700,
        letterSpacing: '2px',
        fontSize: '0.82rem',
        ...style
      }}>
      {children}
    </h2>
  )
}

export default function ConfigController() {
  const appContext = useContext(store)
  const { appState, appDispatch } = appContext
  const [isDrawerOpen, setDrawerState] = useState(false)
  const isMobile = useMobile()
  const toggleDrawer = () => setDrawerState(!isDrawerOpen)

  return (
    <NonBubblingComponent>
      <MapControllerButton style={{ fontSize: '19px' }} onClick={toggleDrawer}>
        <BsGearFill />
      </MapControllerButton>

      <Drawler
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
            Configurações
          </p>
        </div>

        <div>
          <ConfigHeading className="mt-3">Interface de Usuário</ConfigHeading>
          <div
            className="is-flex is-align-content-center mx-2 my-3"
            onClick={() => appDispatch({
              type: 'toggleConfig',
              payload: {
                config: 'showZoomController',
                value: !appState.config.showZoomController
              }
            })}>
            <p className="is-flex-grow-1">Mostrar botão de zoom</p>
            <CheckIcon active={appState.config.showZoomController} outline={false} />
          </div>
          <div
            className="is-flex is-align-content-center mx-2 my-3"
            onClick={() => appDispatch({
              type: 'toggleConfig',
              payload: {
                config: 'showBusLineController',
                value: !appState.config.showBusLineController
              }
            })}>
            <p className="is-flex-grow-1">Mostrar botão de linhas</p>
            <CheckIcon active={appState.config.showBusLineController} outline={false} />
          </div>
          <div
            className="is-flex is-align-content-center mx-2 my-3"
            onClick={() => appDispatch({
              type: 'toggleConfig',
              payload: {
                config: 'showBusRouteController',
                value: !appState.config.showBusRouteController
              }
            })}>
            <p className="is-flex-grow-1">Mostrat botão de rotas</p>
            <CheckIcon active={appState.config.showBusRouteController} outline={false} />
          </div>

          <ConfigHeading className="mt-4">Sobre</ConfigHeading>
          <div className="mx-2 mt-1">
            <p><b>{APP_NAME} v{version}</b></p>
            <p>
              Este é um aplicativo de código aberto desenvolvido por {' '}
              <a
                href="https://github.com/nmcardoso"
                target="_BLANK"
                rel="noreferrer">
                @nmcardoso
              </a>{' '}
              e hospedado{' '}
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
              <b>Agradecimentos:</b> Este aplicativo foi criado usando várias
              bibliotecas de código aberto como <i>Leaflet</i>, <i>React</i> e <i>Nextjs</i>.
              Este aplicativo é acessível a todos graças aos serviços de hospedagem
              do <i>Vercel</i> e dos webserviços do <i>OpenStreetMap</i> e da <i>SPTrans</i>.
            </p>
          </div>

          {/* <ConfigHeading className="mt-3">Instale o aplicativo</ConfigHeading> */}
        </div>
      </Drawler>
    </NonBubblingComponent >
  )
}