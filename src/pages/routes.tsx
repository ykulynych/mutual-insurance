import * as React from 'react'
import { drizzleConnect } from 'drizzle-react'
import { Home } from './Home'
import { NotFound } from './NotFound'
import { Profile } from './Profile'
import { Policy } from './Policy'
import { Routes as RoutesType } from '../types'

const routesMap: { [key: string]: any } = {
  [RoutesType.HOME]: Home,
  [RoutesType.PROFILE]: Profile,
  [RoutesType.POLICY]: Policy,
  [RoutesType.NOTFOUND]: NotFound
}

interface Props {
  route: RoutesType
}

const Container: React.SFC<Props> = ({ route }) => {
  const Route = routesMap[route] ? routesMap[route] : routesMap[RoutesType.NOTFOUND]
  return (
    <Route />
  )
}

const mapStateToProps = (state: any) => ({
  route: state.route
}) as Props

export const Routes = drizzleConnect(
  Container,
  mapStateToProps
)
