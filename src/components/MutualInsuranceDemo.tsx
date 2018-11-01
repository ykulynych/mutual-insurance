import * as React from "react"
import { SFC } from "react"
import {
  StyleRulesCallback,
  withStyles,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
} from "@material-ui/core"
import { ContractData, ContractForm } from "drizzle-react-components"
import * as User from "../contracts/User.json"
import * as Policy from "../contracts/Policy.json"

const NULL = "0x0000000000000000000000000000000000000000"

type Props = {
  insuranceFundStatus: any
  contracts: any
  drizzle: any
  account: any
}

type AllProps = Props & { classes: StyleClassNames }

const MutualInsuranceDemo: SFC<AllProps> = (
  { insuranceFundStatus, contracts, drizzle, account, classes }
) => {

  // How to interact with contracts directly
  // const doSmth = () => contracts.User.methods.setProfileInfo(
  //   "Yura", 10000, 0, 0, "0xa5b9d60f32436310afebcfda832817a68921beb782fabf7915cc0460b443116a"
  // ).send()
  const register = () => {
    contracts.UserRegistry.methods.register().send()
  }
  const createUserInstance = () => {
    contracts.UserRegistry.methods.me().call().then((me: any) => {
        console.log(me)
        var contractConfig = {
          contractName: "MyUserInstance",
          web3Contract: new drizzle.web3.eth.Contract(User.abi, me, { from: account, data: User.deployedBytecode })
        }
        drizzle.addContract(contractConfig, [])
      }
    )
  }

  const createPolicy = () => {
    contracts.MyUserInstance.methods.createPolicy(1e18.toString(), 100000000, 100).send()
  }

  const createPolicyInstance = () => {
    contracts.MyUserInstance.methods.getPolicy().call().then((policy: any) => {
      console.log(policy)
      var contractConfig = {
        contractName: "MyPolicyInstance",
        web3Contract: new drizzle.web3.eth.Contract(Policy.abi, policy, { from: account, data: Policy.deployedBytecode })
      }
      drizzle.addContract(contractConfig, [])
    })
  }

  const cancelPolicy = () => {
    contracts.MyUserInstance.methods.cancelPolicy().send()
  }

  const payPremium = () => {
    contracts.MyUserInstance.methods.payPremium().send({ from: account, value: drizzle.web3.utils.toWei("1", "ether")})
  }

  const setProfile = () => {
    contracts.MyUserInstance.methods.setProfileInfo(
      "Yura", 10000, "Lviv", "male", "0xa5b9d60f32436310afebcfda832817a68921beb782fabf7915cc0460b443116a"
    ).send()
  }

  const getProfile = () => {
    contracts.MyUserInstance.methods.getProfileInfo().call().then((info: any) => {
      console.log("PROFILE_INFO", info)
    })
  }

  const getPolicyInfo = () => {
    contracts.MyPolicyInstance.methods.getPolicyInfo().call().then((info: any) =>
      console.log(info)
    ).catch((err: any) => console.error(err))
  }

  const reportInsuredEvent = () => {
    contracts.MyUserInstance.methods.reportInsuredEvent().send()
  }

  const withdraw = () => {
    contracts.InsuranceFund.methods.withdraw().send()
  }

  const insuranceFundSynced = insuranceFundStatus.synced

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          SimpleStorage - smart contract
        </Typography>
        <Typography variant="headline" component="h2">
          Value:
          <ContractData contract="InsuranceFund" method="getFund" />
        </Typography>

        {/* <ContractForm
          contract="SimpleStorage"
          method="set"
          labels={["Change the value"]}
        /> */}
      </CardContent>
        <Button size="small" onClick={register} variant="raised">
          Register
        </Button>
        <Button size="small" onClick={createUserInstance} variant="raised">
          Create User Instance
        </Button>
        <Button size="small" onClick={createPolicy} variant="raised">
          Create Policy
        </Button>
        <Button size="small" onClick={createPolicyInstance} variant="raised">
          Create Policy Instance
        </Button>
        <Button size="small" onClick={cancelPolicy} variant="raised">
          Cancel Policy
        </Button>
        <Button size="small" onClick={getPolicyInfo} variant="raised">
          Get Policy Info
        </Button>
        <Button size="small" onClick={setProfile} variant="raised">
          Set Profile
        </Button>
        <Button size="small" onClick={getProfile} variant="raised">
          Get Profile
        </Button>
        <Button size="small" onClick={payPremium} variant="raised">
          Pay Premium
        </Button>
        <Button size="small" onClick={reportInsuredEvent} variant="raised">
          Report Insured Event
        </Button>
        <Button size="small" onClick={withdraw} variant="raised">
          Withdraw
        </Button>
      {insuranceFundSynced ? (
        ""
      ) : (
        <CircularProgress className={classes.progress} size={20} />
      )}
    </Card>
  )
}

type StyleClassNames = {
  card: string
  progress: string
  title: string
}

const styles: StyleRulesCallback = theme => ({
  card: {
    width: 275,
    minHeight: 200,
    marginBottom: 50,
  },
  progress: {
    float: "right",
    padding: 5,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
})

export default withStyles(styles)<Props>(MutualInsuranceDemo)