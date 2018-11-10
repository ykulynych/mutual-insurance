import * as mortalityTable from '../assets/mortalityTable.json'
import { MortalityTable, City, UaGender } from '../types'
import { calculateAge } from './calculateAge'

const MT: MortalityTable = mortalityTable

export function calculateProbabilityOfInsuredEvent(
  gender: 'man' | 'woman',
  duration: number,
  age: number,
  city: City
) {
  const generalProbability = 1 - MT[gender][age + duration].l / MT[gender][age].l
  const cityModifier = MT.city.avarage[gender] / MT.city[city][gender]
  const generalProbabilityWithCityModifier = generalProbability * cityModifier
  return generalProbabilityWithCityModifier
}

export function calculatePremium(compensation: number, probability: number): number {
  return compensation * probability
}

export function calculateMonthPremium(
  compensation: number,
  duration: number,
  city: City,
  uaGender: UaGender,
  birthDate: string
): number {
  const age = calculateAge(birthDate)
  const gender = uaGender === UaGender.Чоловік ? 'man' : 'woman'
  const probability = calculateProbabilityOfInsuredEvent(gender, duration, age, city)
  const premium = calculatePremium(compensation, probability)
  const monthPremium = premium / (duration * 12 - 1)
  return monthPremium
}