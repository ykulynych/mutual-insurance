export enum City {
  'Вінницька',
  'Волинська',
  'Дніпропетровська',
  'Житомирська',
  'Закарпатська',
  'Запорізька',
  'Івано-Франківська',
  'Київська',
  'Кіровоградська',
  'Львівська',
  'Миколаївська',
  'Одеська',
  'Полтавська',
  'Рівненська',
  'Сумська',
  'Тернопільська',
  'Харківська',
  'Херсонська',
  'Хмельницька',
  'Черкаська',
  'Чернівецька',
  'Чернігівська',
  'м.Київ'
}

export enum UaGender {
  'Чоловік',
  'Жінка'
}

export interface Profile {
  name: string
  birthDate: string,
  city: City
  gender: UaGender
}

export interface User extends Profile {
  isRegistered: boolean
  hasPolicy: boolean
  canWithdraw: boolean
}