export interface Profile {
  name: string
  birthDate: string | number,
  city: string
  gender: string
}

export interface User extends Profile {
  isRegistered: boolean
  hasPolicy: boolean
  canWithdraw: boolean
}