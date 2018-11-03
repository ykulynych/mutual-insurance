import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory('POLICY')

export const initPolicy = actionCreator<any>('INIT_POLICY')
export const createPolicy = actionCreator<any>('CREATE_POLICY')
export const cancelPolicy = actionCreator<any>('CANCEL_POLICY')
export const payPremium = actionCreator<any>('PAY_PREMIUM')
export const reportEvent = actionCreator<any>('REPORT_EVENT')
