export type StatisticalParameters = {
  q: number
  p: number
  l: number
  d: number
  L: number
  T: number
  e: number
}

export type AdditionalStatisticalParameters = {
  [ key: string ]: {
    man: number
    woman: number
  }
}

export type MortalityTable = {
  man: Array<StatisticalParameters>
  woman: Array<StatisticalParameters>
  city: AdditionalStatisticalParameters
}