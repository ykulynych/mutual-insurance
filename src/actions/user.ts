import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory('USER')

export const initProfile = actionCreator<any>('INIT_PROFILE')
export const updateProfile = actionCreator<any>('UPDATE_PROFILE')
export const register = actionCreator<any>('REGISTER')
export const withdrawCompensation = actionCreator<any>('WITHDRAW')
export const gotCompensation = actionCreator<any>('GOT_WITHDRAW')
export const canWithdrawCompensation = actionCreator<any>('CAN_WITHDRAW_COMPENSATION')