import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory('POLICY')

export const initPolicy = actionCreator<any>('INIT_POLICY')
export const createPolicy = actionCreator<any>('CREATE_POLICY')
export const cancelPolicy = actionCreator<any>('CANCEL_POLICY')
export const submitCancelledPolicy = actionCreator<any>('SUBMIT_CANCELLED_POLICY')
export const payPremium = actionCreator<any>('PAY_PREMIUM')
export const updateTimeOfNextPayement = actionCreator<any>('UPDATE_TIME_OF_NEXT_PAYEMENT')
export const reportEvent = actionCreator<any>('REPORT_EVENT')
export const submitReportedEvent = actionCreator<any>('SUBMIT_REPORTED_EVENT')