import actionCreatorFactory from 'typescript-fsa'
import { NOT_FOUND } from 'redux-first-router'

import { Routes } from '../pages/routes/types'

const actionCreator = actionCreatorFactory()

export const routeHome = actionCreator<{}>(Routes.HOME)
export const routeProfile = actionCreator<{}>(Routes.PROFILE)
export const routePolicy = actionCreator<{}>(Routes.POLICY)
export const routeNotFound = actionCreator<{}>(NOT_FOUND)