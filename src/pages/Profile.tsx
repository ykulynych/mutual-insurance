import * as React from 'react'
import { drizzleConnect } from 'drizzle-react'
import { StyleRulesCallback, withStyles, Typography, Grid } from '@material-ui/core'
import * as PropTypes from 'prop-types'
import SwarmDemo from '../containers/SwarmDemo'
import MutualInsuranceDemo from '../components/MutualInsuranceDemo'
import ReduxDemo from '../containers/ReduxDemo'

type Props = {
  insuranceFundStatus: any
  account: string
  dataArray: string[]
  addData: (data: string) => void
}

type Context = {
  drizzle: {
    web3: any
    contracts: any
  }
}

const styles: StyleRulesCallback = theme => ({})

const Component: React.SFC<Props & { classes: any }> = (
  { insuranceFundStatus, dataArray, account, addData, classes },
  { drizzle }: Context
) => {
  const contracts = drizzle.contracts

  // How to get ahold of web3:
  const web3 = drizzle.web3
  console.log('web3 version: ' + web3.version)

  // const addDateToDataArray = () => addData(Date.now().toString())

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={4}>
        <MutualInsuranceDemo
          insuranceFundStatus={insuranceFundStatus}
          contracts={contracts}
          drizzle={drizzle}
          account={account}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <ReduxDemo />
      </Grid>
      <Grid item xs={12} sm={4}>
        <SwarmDemo />
      </Grid>
      <Typography>Active account: {account}</Typography>
    </Grid>
  )
}

const mapStateToProps = (state: any) => ({
  insuranceFundStatus: state.contracts.InsuranceFund,
  account: state.accounts[0],
})

Component.contextTypes = {
  drizzle: PropTypes.object,
}

export default drizzleConnect(
  withStyles(styles)<Props>(Component),
  mapStateToProps
)
