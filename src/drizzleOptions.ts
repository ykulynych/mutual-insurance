import * as InsuranceFund from "./contracts/InsuranceFund.json"
import * as UserRegistry from "./contracts/UserRegistry.json"

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7585",
    },
  },
  contracts: [InsuranceFund, UserRegistry],
  events: [],
}

export default drizzleOptions
