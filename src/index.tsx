import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './App'
import { register } from './registerServiceWorker'
import 'typeface-roboto'

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
register()
