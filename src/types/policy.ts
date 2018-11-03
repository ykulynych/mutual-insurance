export interface PolicyShort {
  duration: number
  premium: number
  compensation: number
}

export interface Policy {
  startTime: string
  endTime: string
  timeOfNextPayement: string
  premium: number
  compensation: number
}