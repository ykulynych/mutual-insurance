import * as React from 'react'
import { Theme, withStyles, StyleRulesCallback, WithStyles } from '@material-ui/core/styles'
import { drizzleConnect } from 'drizzle-react'
import Button from '@material-ui/core/Button'
import * as Actions from '../actions'

const styles: StyleRulesCallback = (theme: Theme) => ({})

interface Props extends WithStyles<typeof styles> {
  isRegistered: boolean,
  register: () => any
}

const Component = withStyles(styles)<Props>(({ isRegistered, register }) => {
  if (!isRegistered) {
    return (
      <div>
        <h2>Доброго дня! Зареєструйтесь, будь-ласка.</h2>
        <p>Реєстрація необхідна!</p>
        <Button
          variant='raised'
          color='primary'
          size='large'
          onClick={() => register()}
        >
          Зареєструватись
        </Button>
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
  register: () => dispatch(Actions.register({}))
})

export default drizzleConnect(
  Component,
  mapStateToProps,
  mapDispatchToProps
)