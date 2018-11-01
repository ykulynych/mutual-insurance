import { reducerWithInitialState } from 'typescript-fsa-reducers'

import * as Actions from '../actions'

const initData = (): any => ({
  dataArray: [],
})

export default reducerWithInitialState<any>(
  initData()
)
  .case(Actions.addData, (state, data) => ({
    ...state,
    dataArray: state.dataArray.concat(data)
  }))
