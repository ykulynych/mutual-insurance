import * as React from 'react'
import { Theme, withStyles, StyleRulesCallback, WithStyles } from '@material-ui/core/styles'
import { drizzleConnect } from 'drizzle-react'
import Button from '@material-ui/core/Button'
import * as Actions from '../actions'
import { EditProfile } from '../components/EditProfile'

const styles: StyleRulesCallback = (theme: Theme) => ({})

interface Props extends WithStyles<typeof styles> {
  isRegistered: boolean,
  register: (profile: any) => any
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
})

const mapDispatchToProps = (dispatch: any) => ({
  register: (profile: any) => dispatch(Actions.register(profile))
})

export default drizzleConnect(
  Component,
  mapStateToProps,
  mapDispatchToProps
)