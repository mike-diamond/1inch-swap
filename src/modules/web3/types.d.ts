import { Web3Provider } from '@ethersproject/providers'


declare global {

  declare namespace Web3 {

    type Context = {
      chain: number
      address: string
      isConnecting: boolean
      provider: Web3Provider | null
      connect: () => void
    }
  }
}
