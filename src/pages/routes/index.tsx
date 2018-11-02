import * as React from 'react'
import { drizzleConnect } from 'drizzle-react'

import * as Types from './types'

import Home from '../Home'
import NotFound from '../NotFound'
import Profile from '../Profile'

const routesMap: { [key: string]: any } = {
  [Types.Routes.HOME]: Home,
  [Types.Routes.PROFILE]: Profile,
  [Types.Routes.NOTFOUND]: NotFound
}

interface Props {
  route: Types.Routes
}

const Container: React.SFC<Props> = ({ route }) => {
  const Route = routesMap[route] ? routesMap[route] : routesMap[Types.Routes.NOTFOUND]
  return (
    <Route />
  )
}

const mapStateToProps = (state: any) => ({
  route: state.route
})

export const Routes = drizzleConnect(
  Container,
  mapStateToProps
)
