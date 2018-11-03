import * as React from 'react'
import { Card, CardContent, Button, CardActions, Typography, StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core'
import { drizzleConnect } from 'drizzle-react'
import * as Actions from '../actions'
import { EditProfile } from '../components/EditProfile'
import { CreatePolicy } from '../components/CreatePolicy'
import { Profile as ProfileType, User } from 'src/types'
import { Dispatch } from 'redux'

const styles: StyleRulesCallback = theme => ({
  container: {
    marginTop: 24
  }
})

interface Props extends WithStyles<typeof styles> {
  user: User
  updateProfile: (profile: ProfileType) => any
  withdraw: () => any
}

const Component = withStyles(styles)<Props>(({ user, updateProfile, withdraw, classes }) => (
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
      <EditProfile
         name='Редагувати профіль'
         description='Якщо ви ввели неправильні дані, можете їх виправити.'
         onAccept={updateProfile}
      />
      {!user.hasPolicy && <CreatePolicy />}
      {user.canWithdraw &&
        <Button onClick={() => withdraw()}  color='secondary' variant='outlined'>
          Отримати компенсацію
        </Button>
      }
    </CardActions>
  </Card>
))

const mapStateToProps = (state: any) => ({
  user: state.user
}) as Props

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  updateProfile: profile => dispatch(Actions.updateProfile(profile)),
  withdraw: () => dispatch(Actions.withdrawCompensation({}))
}) as Props

export const Profile = drizzleConnect(
  Component,
  mapStateToProps,
  mapDispatchToProps
)