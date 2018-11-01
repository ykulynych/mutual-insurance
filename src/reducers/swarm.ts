import { reducerWithInitialState } from 'typescript-fsa-reducers'

import * as Actions from '../actions'

const initData = (): any => ({
  hashes: [],
  selectedContent: '',
})

export default reducerWithInitialState<any>(
  initData()
)
  .case(Actions.addHash, (state, data) => ({
    ...state,
    hashes: state.hashes.concat(data)
  }))
  .case(Actions.addSelectedContent, (state, data) => ({
    ...state,
    selectedContent: data,
  }))
