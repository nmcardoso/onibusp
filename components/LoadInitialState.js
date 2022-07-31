import { useContext, useEffect } from 'react'
import localforage from 'localforage'
import { SCHEMA_VERSION, store } from '../utils/store'


export default function LoadInitialState() {
  const appContext = useContext(store)
  const { appDispatch } = appContext

  useEffect(() => {
    localforage.getItem('appState', (err, loadedState) => {
      if (!err && loadedState !== null) {
        // Essa implementação está ok por agora, mas descartar o estado salvo
        // a cada atualização do schema não é um boa ideia do ponto de vista
        // de experiência de usuário. No futuro, esta implementação deve
        // comparar e mesclar os estados caso a versão seja diferente
        if (loadedState.schemaVersion === SCHEMA_VERSION) {
          appDispatch({ type: 'loadSavedState', payload: loadedState })
        }
      }
    })
  }, [appDispatch])

  return null
}