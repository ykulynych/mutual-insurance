import * as React from 'react'
import { 
  CardContent,
  Button,
  CardActions,
  StyleRulesCallback,
  withStyles,
  WithStyles,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core'
import { drizzleConnect } from 'drizzle-react'
import * as Actions from '../actions'
import { EditProfile } from '../components/EditProfile'
import { CreatePolicy } from '../components/CreatePolicy'
import { Profile as ProfileType, User } from 'src/types'
import { Dispatch } from 'redux'

const styles: StyleRulesCallback = theme => ({})

interface Props extends WithStyles<typeof styles> {
  user: User
  updateProfile: (profile: ProfileType) => any
  withdraw: () => any
}

const Component = withStyles(styles)<Props>(({ user, updateProfile, withdraw, classes }) => (
  <>
    <CardContent>
      <Table>
        <TableBody >
          <TableRow>
              <TableCell>Ім`я:</TableCell>
              <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow selected>
              <TableCell>Стать:</TableCell>
              <TableCell>{user.gender}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell>Область:</TableCell>
              <TableCell>{user.city}</TableCell>
          </TableRow>
          <TableRow selected>
              <TableCell>Дата народження:</TableCell>
              <TableCell>{user.birthDate}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
    <CardActions>
      <EditProfile
         name='Редагувати профіль'
         description='Якщо ви ввели неправильні дані, можете їх виправити.'
         user={user}
         onAccept={updateProfile}
      />
      {!user.hasPolicy && <CreatePolicy />}
      {user.canWithdraw &&
        <Button onClick={() => withdraw()}  color='secondary' variant='text'>
          Отримати компенсацію
        </Button>
      }
    </CardActions>
  </>
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