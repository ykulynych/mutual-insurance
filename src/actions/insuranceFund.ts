import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory('INSURANCE_FUND')

export const setFund = actionCreator<string>('SET_FUND')
export const setCompensations = actionCreator<string>('SET_COPMENSATIONS')
export const updateFund = actionCreator<string>('UPDATE_FUND')
export const updateCompensations = actionCreator<string>('UPDATE_COPMENSATIONS')