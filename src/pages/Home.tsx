import * as React from 'react'
import { Theme, withStyles, StyleRulesCallback, WithStyles, CardActions, CardContent, Typography } from '@material-ui/core'
import { drizzleConnect } from 'drizzle-react'
import * as Actions from '../actions'
import { EditProfile } from '../components/EditProfile'
import { Profile, User } from 'src/types'
import { Dispatch } from 'redux'

const styles: StyleRulesCallback = (theme: Theme) => ({})

interface Props extends WithStyles<typeof styles> {
  user: User,
  register: (profile: Profile) => any
}

const Component = withStyles(styles)<Props>(({ user, register }) => {
  if (!user.isRegistered) {
    return (
      <>
        <CardContent>
          <Typography variant='title'>
            Доброго дня! Зареєструйтесь, будь-ласка.
          </Typography>
          <Typography variant='subheading' >
            Реєстрація необхідна!
          </Typography>
        </CardContent>
        <CardActions>
          <EditProfile
            name='Зареєструватись'
            description='Реєстрація потрібна для подальшої роботи.'
            user={user}
            onAccept={register}
          />
        </CardActions>
      </>
    )
  } else {
    return (
      <CardContent>
        <Typography variant='title'>
          Доброго дня! Вітаємо, ви успішно зареєстровані!
        </Typography>
        <Typography variant='subheading' >
          Дякуємо за реєстацію!
        </Typography>
      </CardContent>
    )
  }
})

const mapStateToProps = (state: any) => ({
  user: state.user
}) as Props

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  register: profile => dispatch(Actions.register(profile))
}) as Props

export const Home = drizzleConnect(
  Component,
  mapStateToProps,
  mapDispatchToProps
)