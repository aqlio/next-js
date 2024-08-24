'use client'

import { Provider } from 'react-redux'
import { store } from '../store/store' // adjust this path as needed

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}