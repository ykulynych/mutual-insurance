import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory('USER')

export const initProfile = actionCreator<any>('INIT_PROFILE')
export const updateProfile = actionCreator<any>('UPDATE_PROFILE')
export const register = actionCreator<any>('REGISTER')