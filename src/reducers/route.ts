import { reducerWithInitialState } from 'typescript-fsa-reducers'

import * as Actions from '../actions'
import { Route, Routes } from '../pages/routes/types'

export default reducerWithInitialState<Route>(null)
  .case(Actions.routeHome, () => Routes.HOME)
  .case(Actions.routeProfile, () => Routes.PROFILE)
  .case(Actions.routeNotFound, () => Routes.NOTFOUND)