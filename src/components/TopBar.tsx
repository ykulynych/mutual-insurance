import * as React from 'react'
import { AppBar, Button, Toolbar, Typography, StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core'
import { drizzleConnect } from 'drizzle-react'
import * as Actions from '../actions'
import { Fund, User } from 'src/types'

const styles: StyleRulesCallback = theme => ({
  toolBar: {
    justifyContent: 'space-between'
  }
})

interface Props extends WithStyles<typeof styles> {
  fund: Fund
  user: User
  toHome: () => void
  toProfile: () => void
  toPolicy: () => void
}

const Component = withStyles(styles)<Props>(({ fund, user, toHome, toProfile, toPolicy, classes }) => (
  <AppBar position='absolute'>
    <Toolbar className={classes.toolBar}>
      <div>
        <Typography variant='body1' color='inherit' component='h4'>
          {`Розмір страхового фонду: ${fund.fund} ETH`}
        </Typography>
        <Typography variant='body1' color='inherit' component='h4'>
          {`Розмір виплачених компенсацій: ${fund.compensations} ETH`}
        </Typography>
      </div>
      <div>
        <Button color='inherit' onClick={() => toHome()}>
          Головна
        </Button>
        <Button color='inherit' onClick={() => toProfile()} disabled={!user.isRegistered}>
          Профайл
        </Button>
        <Button color='inherit' onClick={() => toPolicy()} disabled={!user.hasPolicy}>
          Поліс
        </Button>
      </div>
    </Toolbar>
  </AppBar>
))

const mapStateToProps = (state: any) => ({
  fund: state.fund,
  user: state.user
}) as Props

const mapDispatchToProps = (dispatch: any) => ({
  toHome: () => dispatch(Actions.routeHome({})),
  toProfile: () => dispatch(Actions.routeProfile({})),
  toPolicy: () => dispatch(Actions.routePolicy({}))
}) as Props

export const TopBar = drizzleConnect(
  Component,
  mapStateToProps,
  mapDispatchToProps
)
