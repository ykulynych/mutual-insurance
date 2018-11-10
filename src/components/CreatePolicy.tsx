import * as React from 'react'
import { 
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Typography,
  InputAdornment
} from '@material-ui/core'
import * as Actions from '../actions'
import { drizzleConnect } from 'drizzle-react'
import { PolicyShort, User } from 'src/types'
import { Dispatch } from 'redux'
import { calculateMonthPremium } from 'src/utils'

const styles: StyleRulesCallback = theme => ({
  mgt15: {
    marginTop: 15
  }
})

interface Props extends WithStyles<typeof styles> {
  user: User
  createPolicy: (policy: PolicyShort) => any
}

interface State extends PolicyShort {
  open: boolean
}

class Component extends React.Component<Props, State> {
  state = {
    open: false,
    premium: 0,
    compensation: 0,
    duration: 10
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  cancel = () => {
    this.setState({ open: false })
  }

  accept = () => {
    this.setState({ open: false })
    this.props.createPolicy({
      duration: this.state.duration,
      premium: this.state.premium,
      compensation: this.state.compensation
    })
  }

  handleChangeDuration(stringDuration: string) {
    if (this.wrongDuration(stringDuration)) {
      this.setState({ duration: stringDuration as any }) // we should put here a string not a number
    } else {
      const duration = parseInt(stringDuration, 10)
      const { city, gender, birthDate } = this.props.user
      this.setState((prevState: State) => ({ 
        duration,
        premium: calculateMonthPremium(prevState.compensation, duration, city, gender, birthDate as string)
      }))
    }
  }

  handleChangeCompensation(stringCompensation: string) {
    if (this.wrongCompensation(stringCompensation)) {
      this.setState({ compensation: stringCompensation as any })
    } else {
      const compensation = parseFloat(stringCompensation)
      const { city, gender, birthDate } = this.props.user
      this.setState((prevState: State) => ({
        compensation,
        premium: calculateMonthPremium(compensation, prevState.duration, city, gender, birthDate as string)
      }))
    }
  }

  wrongDuration(duration: string | number): boolean {
    const intDuration = parseInt(duration as string, 10)
    return !duration || intDuration < 1 || intDuration > 20
  }

  wrongCompensation(compensation: string | number): boolean {
    const intCompensation = parseFloat(compensation as string)
    return !intCompensation || intCompensation <= 0 || intCompensation > 100
  }

  checkWrongDuration(): boolean {
    return this.wrongDuration(this.state.duration)
  }

  checkWrongCompensation(): boolean {
    return this.wrongCompensation(this.state.compensation)
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Button color='primary' variant='text' onClick={this.handleClickOpen}>Створити поліс</Button>
        <Dialog
          open={this.state.open}
          onClose={this.cancel}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Створити поліс</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Створюйте поліс обережно!
            </DialogContentText>
            <TextField 
              autoFocus
              value={this.state.duration}
              onChange={e => this.handleChangeDuration(e.target.value)}
              label='Тривалість полісу'
              type='number' 
              fullWidth
              className={classes.mgt15}
              required
              error={this.checkWrongDuration()}
              InputProps={{
                endAdornment: <InputAdornment position='end'>Років</InputAdornment>,
              }}
            />
            <TextField 
              value={this.state.compensation}
              onChange={e => this.handleChangeCompensation(e.target.value)}
              label='Компенсація'
              type='number'
              fullWidth
              className={classes.mgt15}
              required
              error={this.checkWrongCompensation()}
              InputProps={{
                endAdornment: <InputAdornment position='end'>ETH</InputAdornment>,
              }}
            />
            <Typography variant='subheading' component='h3' className={classes.mgt15}>
              {`Щомісячна оплата: ${this.state.premium.toFixed(5)} ETH`}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancel} color='secondary'>
              Відмінити
            </Button>
            <Button
              onClick={this.accept}
              color='primary'
              disabled={this.checkWrongDuration() || this.checkWrongCompensation()}
            >
              Підтвердити
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  user: state.user
}) as Props

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  createPolicy: policy => dispatch(Actions.createPolicy(policy))
}) as Props

export const CreatePolicy = drizzleConnect(
  withStyles(styles)<Props>(Component),
  mapStateToProps,
  mapDispatchToProps
)
