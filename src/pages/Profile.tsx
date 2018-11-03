import * as React from 'react'
import { Card, CardContent, Button, CardActions, Typography, StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core'
import { drizzleConnect } from 'drizzle-react'
import * as Actions from '../actions'
import { EditProfile } from '../components/EditProfile'
import { CreatePolicy } from '../components/CreatePolicy'

const styles: StyleRulesCallback = theme => ({
  container: {
    marginTop: 24
  }
})

interface Props extends WithStyles<typeof styles> {
  user: any
}

const Component = withStyles(styles)<Props>(({ user, classes }) => (
  <Card className={classes.container}>
    <CardContent>
      <Typography variant='headline' component='h2'>
        {user.name}
      </Typography>
      <Typography variant='headline' component='h2'>
        {user.gender}
      </Typography>
      <Typography variant='headline' component='h2'>
        {user.city}
      </Typography>
      <Typography variant='headline' component='h2'>
        {user.birthDate}
      </Typography>
    </CardContent>
    <CardActions>
      <EditProfile />
      {!user.hasPolicy && <CreatePolicy />}
    </CardActions>
  </Card>
))

const mapStateToProps = (state: any) => ({
  user: state.user
})

export default drizzleConnect(
  Component,
  mapStateToProps
)