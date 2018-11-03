import actionCreatorFactory from 'typescript-fsa'
import { Profile } from 'src/types'

const actionCreator = actionCreatorFactory('USER')

export const initProfile = actionCreator<Profile>('INIT_PROFILE')
export const updateProfile = actionCreator<Profile>('UPDATE_PROFILE')
export const register = actionCreator<Profile>('REGISTER')
export const withdrawCompensation = actionCreator<{}>('WITHDRAW_COMPENSATION')
export const gotCompensation = actionCreator<{}>('GOT_COMPENSATION')
export const canWithdrawCompensation = actionCreator<{}>('CAN_WITHDRAW_COMPENSATION')