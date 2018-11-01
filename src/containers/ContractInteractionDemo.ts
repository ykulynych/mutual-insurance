import { drizzleConnect } from "drizzle-react"
import ContractInteractionDemo from "../components/ContractInteractionDemo"

const mapStateToProps = (state: any) => ({
  insuranceFundStatus: state.contracts.InsuranceFund,
  account: state.accounts[0],
})

export default drizzleConnect(
  ContractInteractionDemo,
  mapStateToProps
)
