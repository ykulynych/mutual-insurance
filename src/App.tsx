import * as React from 'react'
import { DrizzleProvider } from './components/DrizzleProvider'
import { LoadingContainer } from 'drizzle-react-components'
import { store, drizzle } from './store'
import { StyleRules, withStyles } from '@material-ui/core/styles'
import { Layout } from './components/Layout'
import { Routes } from './pages/routes'

const styles: StyleRules = {
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box'
    },
    'html, body, #root': {
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      color: '#000000',
      display: 'block'
    },
    'ul': {
      listStyle: 'none'
    },
    'img': {
      display: 'block'
    },
    'a': {
      textDecoration: 'none',
      color: 'inherit'
    }
  }
}

export const App = withStyles(styles)(({}) => (
  <DrizzleProvider drizzle={drizzle} store={store}>
    <LoadingContainer>
      <Layout>
        <Routes />
      </Layout>
    </LoadingContainer>
  </DrizzleProvider>
))
