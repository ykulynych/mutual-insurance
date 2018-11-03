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
} from '@material-ui/core'
import * as Actions from '../actions'
import { drizzleConnect } from 'drizzle-react'
import { Dispatch } from 'redux'

const styles: StyleRulesCallback = theme => ({
  mgt15: {
    marginTop: 15
  }
})

interface Props extends WithStyles<typeof styles> {
  premium: any,
  payPremium: (premium: number) => any
}

class Component extends React.Component<Props> {
  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  cancel = () => {
    this.setState({ open: false })
  }

  accept = () => {
    this.setState({ open: false })
    this.props.payPremium(this.props.premium)
  }

  render() {
    const { classes, premium } = this.props
    return (
      <div>
        <Button color='primary' variant='raised' onClick={this.handleClickOpen}>Заплатити внесок</Button>
        <Dialog
          open={this.state.open}
          onClose={this.cancel}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Заплатити внесок</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Щомісячні внески необхідно заплатити вчано!
            </DialogContentText>
            <TextField 
              autoFocus
              value={premium}
              margin='dense'
              id='premium'
              label='Щомісячна оплата'
              type='number' 
              fullWidth
              className={classes.mgt15}
              disabled
            />
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

const mapStateToProps = (state: any) => ({
  premium: state.policy.premium / 1e18
}) as Props

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  payPremium: premium => dispatch(Actions.payPremium(premium))
}) as Props

export const PayPremium = drizzleConnect(
  withStyles(styles)<Props>(Component),
  mapStateToProps,
  mapDispatchToProps
)
