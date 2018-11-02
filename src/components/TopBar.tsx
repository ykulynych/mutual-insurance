import * as React from 'react'
import { AppBar, Button, Toolbar, Typography, StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core'
import * as PropTypes from 'prop-types'
import { drizzleConnect } from 'drizzle-react'
import * as Actions from '../actions'

const styles: StyleRulesCallback = theme => ({
  toolBar: {
    justifyContent: 'space-between'
  }
})

interface Props extends WithStyles<typeof styles> {
  contracts: any
  toHome: () => void
  toProfile: () => void
}

type Context = {
  drizzle: {
    contracts: any
    web3: any
  }
}

class Component extends React.Component<Props> {
  fundKey: any
  compensationKey: any
  contracts: any
  constructor(props: Props, context: Context) {
    super(props)
    this.contracts = context.drizzle.contracts
    this.fundKey = this.contracts.InsuranceFund.methods.getFund.cacheCall()
    this.compensationKey = this.contracts.InsuranceFund.methods.getCompensationsPaid.cacheCall()
  }

  render () {
    const { classes, contracts, toHome, toProfile } = this.props

    if (!(this.fundKey in contracts.InsuranceFund.getFund) ||
      !(this.compensationKey in contracts.InsuranceFund.getCompensationsPaid)
    ) {
      return (
        <span>Loading...</span>
      )
    }

    let fund = contracts.InsuranceFund.getFund[this.fundKey].value
    let compensation = contracts.InsuranceFund.getCompensationsPaid[this.compensationKey].value

    return (
      <AppBar position='absolute'>
        <Toolbar className={classes.toolBar}>
          <div>
            <Typography variant='body1' color='inherit' component='h4'>
              {`Розмір страхового фонду: ${fund / 10e15}`}
            </Typography>
            <Typography variant='body1' color='inherit' component='h4'>
              {`Розмір виплачених компенсацій: ${compensation / 10e15}`}
            </Typography>
          </div>
          <div>
            <Button color='inherit' onClick={() => toHome()}>
              Home
            </Button>
            <Button color='inherit' onClick={() => toProfile()}>
              Profile
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    contracts: state.contracts
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    toHome: () => dispatch(Actions.routeHome({})),
    toProfile: () => dispatch(Actions.routeProfile({}))
  }
}

(Component as any).contextTypes = {
  drizzle: PropTypes.object
}

export default drizzleConnect(
  withStyles(styles)(Component as any),
  mapStateToProps,
  mapDispatchToProps
)
