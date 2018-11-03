import * as router from 'redux-first-router'
// import { createBrowserHistory } from 'history'
// import * as querystring from 'querystring'

import { Routes, RoutesMap } from './types'

// const history = createBrowserHistory()

const routesMap: RoutesMap = {}

routesMap[Routes.HOME] = '/'
routesMap[Routes.PROFILE] = '/profile'
routesMap[Routes.POLICY] = '/policy'

export default router.connectRoutes(routesMap)
