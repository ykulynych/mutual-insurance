import * as React from 'react'
import { DrizzleProvider } from './components/DrizzleProvider'
import { LoadingContainer } from 'drizzle-react-components'
import { store, drizzle } from './store'
import Layout from './components/Layout'
import { Routes } from './pages/routes'

const App: React.SFC = () => (
  <DrizzleProvider drizzle={drizzle} store={store}>
    <LoadingContainer>
      <Layout>
        <Routes />
      </Layout>
    </LoadingContainer>
  </DrizzleProvider>
)

export default App
