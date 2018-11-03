import { reducerWithInitialState } from 'typescript-fsa-reducers'

import * as Actions from '../actions'
import { Route, Routes } from '../pages/routes/types'

export default reducerWithInitialState<Route>(null)
  .case(Actions.routeHome, () => Routes.HOME)
  .cases([Actions.routeProfile, Actions.submitCancelledPolicy, Actions.submitReportedEvent], () => Routes.PROFILE)
  .case(Actions.routePolicy, () => Routes.POLICY)
  .case(Actions.routeNotFound, () => Routes.NOTFOUND)