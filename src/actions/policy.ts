import actionCreatorFactory from 'typescript-fsa'
import { Policy, PolicyShort } from 'src/types'

const actionCreator = actionCreatorFactory('POLICY')

export const initPolicy = actionCreator<Policy>('INIT_POLICY')
export const createPolicy = actionCreator<PolicyShort>('CREATE_POLICY')
export const cancelPolicy = actionCreator<{}>('CANCEL_POLICY')
export const submitCancelledPolicy = actionCreator<{}>('SUBMIT_CANCELLED_POLICY')
export const payPremium = actionCreator<number>('PAY_PREMIUM')
export const updateTimeOfNextPayement = actionCreator<string>('UPDATE_TIME_OF_NEXT_PAYEMENT')
export const reportEvent = actionCreator<{}>('REPORT_EVENT')
export const submitReportedEvent = actionCreator<{}>('SUBMIT_REPORTED_EVENT')