import * as React from 'react'
import { Theme, withStyles, StyleRulesCallback, WithStyles } from '@material-ui/core/styles'
import { drizzleConnect } from 'drizzle-react'
import * as Actions from '../actions'
import { EditProfile } from '../components/EditProfile'
import { Profile } from 'src/types'
import { Dispatch } from 'redux'

const styles: StyleRulesCallback = (theme: Theme) => ({})

interface Props extends WithStyles<typeof styles> {
  isRegistered: boolean,
  register: (profile: Profile) => any
}

const Component = withStyles(styles)<Props>(({ isRegistered, register }) => {
  if (!isRegistered) {
    return (
      <div>
        <h2>Доброго дня! Зареєструйтесь, будь-ласка.</h2>
        <p>Реєстрація необхідна!</p>
        <EditProfile
          name='Зареєструватись'
          description='Реєстрація потрібна для подальшої роботи.'
          onAccept={register}
        />
      </div>
    )
  } else {
    return (
      <div>
          <h2>Доброго дня! Вітаємо, ви успішно зареєстровані!</h2>
          <p>Дякуємо за реєстацію!</p>
      </div>
    )
  }
})

const mapStateToProps = (state: any) => ({
  isRegistered: state.user.isRegistered
}) as Props

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  register: profile => dispatch(Actions.register(profile))
}) as Props

export const Home = drizzleConnect(
  Component,
  mapStateToProps,
  mapDispatchToProps
)