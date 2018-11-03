import * as React from 'react'
import { Card, CardContent, Button, CardActions, Typography, StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core'
import { drizzleConnect } from 'drizzle-react'
import * as Actions from '../actions'
import { PayPremium } from '../components/PayPremium'
import { Dispatch } from 'redux'
import { Policy as PolicyType } from 'src/types'

const styles: StyleRulesCallback = theme => ({
  container: {
    marginTop: 24
  }
})

interface Props extends WithStyles<typeof styles> {
  policy: PolicyType
  cancelPolicy: () => any
  reportEvent: () => any
}

const Component = withStyles(styles)<Props>(({ policy, cancelPolicy, reportEvent, classes }) => (
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
      <PayPremium />
      <Button size='medium' color='secondary' variant='outlined' onClick={() => cancelPolicy()}>
        Відмінити поліс
      </Button>
      <Button size='medium' color='primary' variant='outlined' onClick={() => reportEvent()}>
        Повідомити про страховий випадок
      </Button>
    </CardActions>
  </Card>
))

const mapStateToProps = (state: any) => ({
  policy: state.policy
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  cancelPolicy: () => dispatch(Actions.cancelPolicy({})),
  reportEvent: () => dispatch(Actions.reportEvent({}))
})

export const Policy = drizzleConnect(
  Component,
  mapStateToProps,
  mapDispatchToProps
)