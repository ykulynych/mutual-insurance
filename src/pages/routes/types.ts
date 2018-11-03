export enum Routes {
  HOME = 'HOME',
  PROFILE = 'PROFILE',
  POLICY = 'POLICY',
  NOTFOUND = '@@redux-first-router/NOT_FOUND',
}

export type Route = Routes | null

export interface RoutesMap {
  [key: string]: string
}

export type Payload = {
  [key: string]: string
}

export type LocationState = {
  pathname: string,
  type: string,
  payload: Payload,
  query?: Object,
  search?: string,
  prev: Location,
  kind?: string,
  history?: HistoryData,
  routesMap: RoutesMap,
  hasSSR?: true
}

export type Location = {
  pathname: string,
  type: string,
  payload: Payload,
  query?: Object,
  search?: string
}

export type HistoryData = {
  entries: Array<{ pathname: string }>,
  index: number,
  length: number
}