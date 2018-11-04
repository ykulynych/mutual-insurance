import * as moment from 'moment'

export function calculateAge(birthDate: string): number {
  const now = moment()
  const momentBirthDate = moment(birthDate, 'YYYY-MM-DD')
  const age = now.diff(momentBirthDate, 'years')
  return age
}