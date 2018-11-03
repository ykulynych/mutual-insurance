import { Component, Children } from 'react'
import * as PropTypes from 'prop-types'
import { Drizzle, generateStore } from 'drizzle'
import { Store } from 'redux'

interface Props {
  store: Store
  drizzle: any
  options?: any
} // TODO: types

export class DrizzleProvider extends Component<Props> {
  static propTypes = {
    drizzle: PropTypes.object,
    store: PropTypes.object
  }

  // you must specify what you’re adding to the context
  static childContextTypes = {
    drizzle: PropTypes.object.isRequired,
    drizzleStore: PropTypes.object.isRequired
  }

  constructor(context: any, props: any) {
    super(context, props)
  }

  getChildContext() {
    const drizzleStore = this.props.store ? this.props.store : generateStore(this.props.options)
    const drizzle = this.props.drizzle || new Drizzle(this.props.options, this.props.store)
    return { drizzle, drizzleStore }
  }

  render() {
    // `Children.only` enables us not to add a <div /> for nothing
    return Children.only(this.props.children)
  }
}
