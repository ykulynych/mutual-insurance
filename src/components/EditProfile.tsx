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
  StyleRulesCallback
} from '@material-ui/core'
import * as Actions from '../actions'
import { drizzleConnect } from 'drizzle-react'

const styles: StyleRulesCallback = theme => ({
  mgt15: {
    marginTop: 15
  }
})

interface Props extends WithStyles<typeof styles> {
  updateProfile: (profile: any) => any
}

class Component extends React.Component<Props> {
  state = {
    open: false,
    name: 'Юра',
    city: 'Львів',
    gender: 'Чоловік',
    birthDate: new Date().toISOString().slice(0, 10)
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  cancel = () => {
    this.setState({ open: false })
  }

  accept = () => {
    this.setState({ open: false })
    this.props.updateProfile([
      this.state.name,
      Date.parse(this.state.birthDate),
      this.state.city,
      this.state.gender,
    ])
  }

  handleChangeName = (event: any) => {
    this.setState({ name: event.target.value })
  }

  handleChangeCity = (event: any) => {
    this.setState({ city: event.target.value })
  }

  handleChangeGender = (event: any) => {
    this.setState({ gender: event.target.value })
  }

  handleChangeDate = (event: any) => {
    this.setState({ birthDate: event.target.value })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Button color='primary' variant='raised' onClick={this.handleClickOpen}>Рудагувати профіль</Button>
        <Dialog
          open={this.state.open}
          onClose={this.cancel}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Редагувати профіль</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Редагуйте профіль обережно!
            </DialogContentText>
            <TextField 
              autoFocus
              value={this.state.name}
              onChange={this.handleChangeName}
              margin='dense'
              id='name'
              label='Ім`я'
              type='string' 
              fullWidth
            />
            <FormControl fullWidth className={classes.mgt15}>
              <InputLabel htmlFor='city-simple'>Місто</InputLabel>
              <Select
                value={this.state.city}
                onChange={this.handleChangeCity}
                inputProps={{
                  name: 'city',
                  id: 'city-simple',
                }}
              >
                <MenuItem value='Львів'>Львів</MenuItem>
                <MenuItem value='Київ'>Київ</MenuItem>
                <MenuItem value='Полтава'>Полтава</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth className={classes.mgt15}>
              <InputLabel htmlFor='gender-simple'>Стать</InputLabel>
              <Select
                value={this.state.gender}
                onChange={this.handleChangeGender}
                inputProps={{
                  name: 'gender',
                  id: 'gender-simple',
                }}
              >
                <MenuItem value='Чоловік'>Чоловік</MenuItem>
                <MenuItem value='Жінка'>Жінка</MenuItem>
              </Select>
            </FormControl>
            <TextField
              id='birthDate'
              label='Дата народження'
              type='date'
              margin='dense'
              value={this.state.birthDate}
              onChange={this.handleChangeDate}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              className={classes.mgt15}
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

const mapDispatchToProps = (dispatch: any) => ({
  updateProfile: (profile: any) => dispatch(Actions.updateProfile(profile))
})

export const EditProfile = drizzleConnect(
  withStyles(styles)<Props>(Component),
  null,
  mapDispatchToProps
)
