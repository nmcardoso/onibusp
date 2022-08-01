import React, { createContext, useReducer } from 'react'
import localforage from 'localforage'

const persistStateAsync = (state) => {
  localforage.setItem('appState', state, (err, value) => {
    if (err) console.error(err)
  })
}

export const SCHEMA_VERSION = 2

const initialState = {
  schemaVersion: SCHEMA_VERSION,
  control: {
    34791: {
      bus: true,
      route: false
    },
    2023: {
      bus: true,
      route: false
    },
    34853: {
      bus: true,
      route: false
    },
    2085: {
      bus: true,
      route: false
    },
    35313: {
      bus: true,
      route: false
    },
    2545: {
      bus: true,
      route: false
    },
    630: {
      bus: false,
      route: false
    },
    33398: {
      bus: false,
      route: false
    },
    657: {
      bus: false,
      route: false
    },
    33425: {
      bus: false,
      route: false
    },
    1330: {
      bus: false,
      route: false
    },
    34098: {
      bus: false,
      route: false
    },
    1332: {
      bus: false,
      route: false
    },
    34100: {
      bus: false,
      route: false
    },
    1376: {
      bus: false,
      route: false
    },
    34144: {
      bus: false,
      route: false
    },
    472: {
      bus: false,
      route: false
    },
    33240: {
      bus: false,
      route: false
    },
    2254: {
      bus: false,
      route: false
    },
    35022: {
      bus: false,
      route: false
    }
  },
  config: {
    showZoomController: false,
    showBusLineController: true,
    showBusRouteController: true
  }
}

export const store = createContext(initialState)
const { Provider } = store

const toggleBusLineAction = (state, action) => {
  const s = { ...state }
  s.control[action.payload.id].bus = action.payload.show
  persistStateAsync(s)
  return s
}

const toggleBusRouteAction = (state, action) => {
  const s = { ...state }
  s.control[action.payload.id].route = action.payload.show
  persistStateAsync(s)
  return s
}

const toggleConfigAction = (state, action) => {
  const s = { ...state }
  s.config[action.payload.config] = action.payload.value
  persistStateAsync(s)
  return s
}

const loadSavedStateAction = (state, action) => {
  return action.payload
}

export const AppStateProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'toggleBusLine':
        return toggleBusLineAction(state, action)
      case 'toggleBusRoute':
        return toggleBusRouteAction(state, action)
      case 'toggleConfig':
        return toggleConfigAction(state, action)
      case 'loadSavedState':
        return loadSavedStateAction(state, action)
      default:
        return state
    }
  }, initialState)

  return <Provider value={{ appState, appDispatch }}>{children}</Provider>
}
