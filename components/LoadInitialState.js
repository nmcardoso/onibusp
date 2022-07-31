import { useContext, useEffect } from 'react'
import localforage from 'localforage'
import { SCHEMA_VERSION, store } from '../utils/store'


export default function LoadInitialState() {
  const appContext = useContext(store)
  const { appDispatch } = appContext

  useEffect(() => {
    localforage.getItem('appState', (err, loadedState) => {
      if (!err && loadedState !== null) {
        if (loadedState.schemaVersion === SCHEMA_VERSION) {
          appDispatch({ type: 'loadSavedState', payload: loadedState })
        }
      }
    })
  }, [appDispatch])

  return null
}