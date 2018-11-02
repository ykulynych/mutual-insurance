import * as React from 'react'
import { AppBar, Button, Toolbar, Typography, StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core'
import { drizzleConnect } from 'drizzle-react'
import * as Actions from '../actions'

const styles: StyleRulesCallback = theme => ({
  toolBar: {
    justifyContent: 'space-between'
  }
})

interface Props extends WithStyles<typeof styles> {
  insuranceFund: any
  toHome: () => void
  toProfile: () => void
}

const Component = withStyles(styles)<Props>(({ insuranceFund, toHome, toProfile, classes }) => (
  <AppBar position='absolute'>
    <Toolbar className={classes.toolBar}>
      <div>
        <Typography variant='body1' color='inherit' component='h4'>
          {`Розмір страхового фонду: ${insuranceFund.fund} ETH`}
        </Typography>
        <Typography variant='body1' color='inherit' component='h4'>
          {`Розмір виплачених компенсацій: ${insuranceFund.compensations} ETH`}
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
))

const mapStateToProps = (state: any) => ({
  insuranceFund: state.insuranceFund
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    toHome: () => dispatch(Actions.routeHome({})),
    toProfile: () => dispatch(Actions.routeProfile({}))
  }
}

export default drizzleConnect(
  Component,
  mapStateToProps,
  mapDispatchToProps
)
