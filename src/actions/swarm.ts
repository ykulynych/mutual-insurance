import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export const addHash = actionCreator<string>('ADD_HASH')
export const addSelectedContent = actionCreator<any>('ADD_SELECTED_CONTENT')
