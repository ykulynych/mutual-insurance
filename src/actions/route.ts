import actionCreatorFactory from 'typescript-fsa'
import { NOT_FOUND } from 'redux-first-router'

import { Routes } from '../pages/routes/types'

const actionCreator = actionCreatorFactory()

export const routeHome = actionCreator<{}>(Routes.HOME)
export const routeNotFound = actionCreator<{}>(NOT_FOUND)