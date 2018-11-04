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
import { PayPremium } from '../components/PayPremium'
import { Dispatch } from 'redux'
import { Policy as PolicyType } from 'src/types'

const styles: StyleRulesCallback = theme => ({})

interface Props extends WithStyles<typeof styles> {
  policy: PolicyType
  cancelPolicy: () => any
  reportEvent: () => any
}

const Component = withStyles(styles)<Props>(({ policy, cancelPolicy, reportEvent, classes }) => (
  <>
    <CardContent>
      <Table>
        <TableBody >
          <TableRow>
              <TableCell>Поліс створено:</TableCell>
              <TableCell>{policy.startTime}</TableCell>
          </TableRow>
          <TableRow selected>
              <TableCell>Поліс діє до:</TableCell>
              <TableCell>{policy.endTime}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell>Наступний внесок:</TableCell>
              <TableCell>{policy.timeOfNextPayement}</TableCell>
          </TableRow>
          <TableRow selected>
              <TableCell>Сума щомісячної оплати:</TableCell>
              <TableCell>{`${(policy.premium / 1e18).toFixed(7)} ETH`}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell>Сума компенсації:</TableCell>
              <TableCell>{`${(policy.compensation / 1e18).toFixed(5)} ETH`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
    <CardActions>
      <PayPremium />
      <Button size='medium' color='secondary' variant='outlined' onClick={() => cancelPolicy()}>
        Відмінити поліс
      </Button>
      <Button size='medium' color='primary' variant='outlined' onClick={() => reportEvent()}>
        Повідомити про страховий випадок
      </Button>
    </CardActions>
  </>
))

const mapStateToProps = (state: any) => ({
  policy: state.policy
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  cancelPolicy: () => dispatch(Actions.cancelPolicy({})),
  reportEvent: () => dispatch(Actions.reportEvent({}))
})

export const Policy = drizzleConnect(
  Component,
  mapStateToProps,
  mapDispatchToProps
)