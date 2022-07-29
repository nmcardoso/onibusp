import React, { createContext, useReducer } from 'react'
import localforage from 'localforage'

const persistStateAsync = (state) => {
  localforage.setItem('appState', state, (err, value) => {
    if (err) console.error(err)
  })
}

const initialState = {
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
    }
  }
}

const store = createContext(initialState)
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

const AppStateProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'toggleBusLine':
        return toggleBusLineAction(state, action)
      case 'toggleBusRoute':
        return toggleBusRouteAction(state, action)
      default:
        return state
    }
  }, initialState)

  return <Provider value={{ appState, appDispatch }}>{children}</Provider>
}

export { store, AppStateProvider }