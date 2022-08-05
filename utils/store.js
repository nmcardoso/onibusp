import React, { createContext, useReducer } from 'react'
import localforage from 'localforage'

const persistStateAsync = (state) => {
  localforage.setItem('appState', state, (err, value) => {
    if (err) console.error(err)
  })
}

export const SCHEMA_VERSION = 1

const initialState = {
  schemaVersion: SCHEMA_VERSION,
  layers: {
    busPosition: [34791, 2023, 34853, 2085, 2545],
    busRoute: []
  },
  config: {
    showZoomController: false,
    showBusLineController: true,
    showBusRouteController: true,
    showLocationController: true
  }
}

export const store = createContext(initialState)
const { Provider } = store

const toggleConfigAction = (state, action) => {
  const s = { ...state }
  s.config[action.payload.config] = action.payload.value
  persistStateAsync(s)
  return s
}

const toggleLayer = (state, action) => {
  const s = { ...state }
  const layer = action.payload.layer
  let data = s.layers[layer]
  data = data.filter(lineId => lineId != action.payload.lineId)
  if (action.payload.transform === 'add') {
    data.push(action.payload.lineId)
  }
  s.layers[layer] = data
  persistStateAsync(s)
  return s
}

const loadSavedStateAction = (state, action) => {
  return action.payload
}

export const AppStateProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'toggleConfig':
        return toggleConfigAction(state, action)
      case 'loadSavedState':
        return loadSavedStateAction(state, action)
      case 'toggleLayer':
        return toggleLayer(state, action)
      default:
        return state
    }
  }, initialState)

  return <Provider value={{ appState, appDispatch }}>{children}</Provider>
}
