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
import { Profile, City, UaGender, User } from '../types'
import { calculateAge } from 'src/utils'

const styles: StyleRulesCallback = theme => ({
  mgt15: {
    marginTop: 15
  }
})

interface Props extends WithStyles<typeof styles> {
  user: User
  name: string
  description: string
  onAccept: (profile: Profile) => any
}

interface State extends Profile {
  open: boolean
}

class Component extends React.Component<Props, State> {
  state = {
    open: false,
    name: this.props.user.name,
    city: this.props.user.city,
    gender: this.props.user.gender,
    birthDate: this.props.user.birthDate
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  cancel = () => {
    this.setState({ open: false })
  }

  accept = () => {
    this.setState({ open: false })
    this.props.onAccept({
      name: this.state.name,
      birthDate: Date.parse(this.state.birthDate).toString(),
      city: this.state.city,
      gender: this.state.gender,
    })
  }

  handleChangeName(name: string) {
    this.setState({ name })
  }

  handleChangeCity(city: City) {
    this.setState({ city })
  }

  handleChangeGender(gender: UaGender) {
    this.setState({ gender })
  }

  handleChangeDate(birthDate: string) {
    this.setState({ birthDate })
  }

  checkWrongName = (): boolean => {
    return !this.state.name.length
  }

  checkWrongAge = (): boolean => {
    const age = calculateAge(this.state.birthDate)
    return (age < 18) || (age > 70)
  }

  render() {
    const { classes, name, description } = this.props
    return (
      <div>
        <Button color='primary' variant='raised' onClick={this.handleClickOpen}>{name}</Button>
        <Dialog
          open={this.state.open}
          onClose={this.cancel}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>{name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {description}
            </DialogContentText>
            <TextField 
              autoFocus
              value={this.state.name}
              onChange={e => this.handleChangeName(e.target.value)}
              margin='dense'
              id='name'
              label='Ім`я'
              type='string' 
              fullWidth
              required
              error={this.checkWrongName()}
            />
            <FormControl fullWidth className={classes.mgt15} required>
              <InputLabel htmlFor='city-simple'>Область</InputLabel>
              <Select
                value={this.state.city}
                onChange={e => this.handleChangeCity(e.target.value as any)}
                inputProps={{
                  name: 'city',
                  id: 'city-simple',
                }}
              >
                {
                  Object.keys(City).map(key => {
                    if (isNaN(Number(City[key]))) { return } // if enum return number
                    return (<MenuItem value={key} key={key}>{key}</MenuItem>)
                  })
                }
              </Select>
            </FormControl>
            <FormControl fullWidth className={classes.mgt15} required>
              <InputLabel htmlFor='gender-simple'>Стать</InputLabel>
              <Select
                value={this.state.gender}
                onChange={e => this.handleChangeGender(e.target.value as any)}
                inputProps={{
                  name: 'gender',
                  id: 'gender-simple',
                }}
              >
                {
                  Object.keys(UaGender).map(key => {
                    if (isNaN(Number(UaGender[key]))) { return } // if enum return number
                    return (<MenuItem value={key} key={key}>{key}</MenuItem>)
                  })
                }
              </Select>
            </FormControl>
            <TextField
              id='birthDate'
              label='Дата народження'
              type='date'
              margin='dense'
              value={this.state.birthDate}
              onChange={e => this.handleChangeDate(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
              fullWidth
              className={classes.mgt15}
              error={this.checkWrongAge()}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancel} color='secondary'>
              Відмінити
            </Button>
            <Button
              onClick={this.accept}
              color='primary'
              disabled={this.checkWrongAge() || this.checkWrongName()}
            >
              Підтвердити
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export const EditProfile = withStyles(styles)<Props>(Component)
