import * as React from 'react'
import { 
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  withStyles,
  WithStyles,
  StyleRulesCallback,
  Typography
} from '@material-ui/core'
import * as Actions from '../actions'
import { drizzleConnect } from 'drizzle-react'

const styles: StyleRulesCallback = theme => ({
  mgt15: {
    marginTop: 15
  }
})

interface Props extends WithStyles<typeof styles> {
  createPolicy: (policy: any) => any
}

class Component extends React.Component<Props> {
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

  handleChangeDuration = (event: any) => {
    this.setState((prevState: any) => ({ 
      duration: event.target.value,
      compensation: prevState.premium * 100 / event.target.value
    }))
  }

  handleChangePremium = (event: any) => {
    const value = event.target.value || 0
    this.setState((prevState: any) => ({ 
      premium: value,
      compensation: value * 100 / prevState.duration
    }))
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Button color='primary' variant='raised' onClick={this.handleClickOpen}>Створити поліс</Button>
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
            <FormControl fullWidth className={classes.mgt15}>
              <InputLabel htmlFor='duration-simple'>Тривалість</InputLabel>
              <Select
                value={this.state.duration}
                onChange={this.handleChangeDuration}
                inputProps={{
                  name: 'duration',
                  id: 'duration-simple',
                }}
              >
                <MenuItem value={10}>10 років</MenuItem>
                <MenuItem value={15}>15 років</MenuItem>
                <MenuItem value={20}>20 років</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              autoFocus
              value={this.state.premium}
              onChange={this.handleChangePremium}
              margin='dense'
              id='premium'
              label='Щомісячна оплата'
              type='number' 
              fullWidth
              className={classes.mgt15}
            />
            <Typography variant='headline' component='h2' className={classes.mgt15}>
              Компенсація: {this.state.compensation}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancel} color='secondary'>
              Відмінити
            </Button>
            <Button onClick={this.accept} color='primary'>
              Підтвердити
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  createPolicy: (policy: any) => dispatch(Actions.createPolicy(policy))
})

export const CreatePolicy = drizzleConnect(
  withStyles(styles)<Props>(Component),
  null,
  mapDispatchToProps
)
