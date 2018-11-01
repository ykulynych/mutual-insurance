import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const addData = actionCreator<string>('ADD_DATA')