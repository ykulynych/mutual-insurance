import * as React from 'react'
import { Card, CardContent, Button, CardActions, Typography, StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core'
import { drizzleConnect } from 'drizzle-react'
import * as Actions from '../actions'
import { EditProfile } from '../components/EditProfile'

const styles: StyleRulesCallback = theme => ({
  container: {
    marginTop: 24
  }
})

interface Props extends WithStyles<typeof styles> {
  policy: any
  toHome: () => void
  toProfile: () => void
}

const Component = withStyles(styles)<Props>(({ policy, toHome, toProfile, classes }) => (
  <Card className={classes.container}>
    <CardContent>
      <Typography variant='headline' component='h2'>
        {policy.startTime}
      </Typography>
      <Typography variant='headline' component='h2'>
        {policy.endTime}
      </Typography>
      <Typography variant='headline' component='h2'>
        {policy.timeOfNextPayement}
      </Typography>
      <Typography variant='headline' component='h2'>
        {policy.premium / 1e18}
      </Typography>
      <Typography variant='headline' component='h2'>
        {policy.compensation / 1e18}
      </Typography>
    </CardContent>
    <CardActions>
      <EditProfile />
    </CardActions>
  </Card>
))

const mapStateToProps = (state: any) => ({
  policy: state.policy
})

const mapDispatchToProps = (dispatch: any) => ({
  toHome: () => dispatch(Actions.routeHome({})),
  toProfile: () => dispatch(Actions.routeProfile({}))
})

export default drizzleConnect(
  Component,
  mapStateToProps,
  mapDispatchToProps
)