type TokenApiData = {
  name: string
  symbol: string
  decimals: number
  address: string
  logoURI: string
  tags: string[]
}

type Transaction = {
  from: string
  to: string
  data: string
  value: string
  gasPrice: string
  gas: string
}

export type ApiData = {
  fromToken: TokenApiData
  toToken: TokenApiData
  toTokenAmount: string
  fromTokenAmount: string
  protocols: string[]
  tx: Transaction
}

export type Input = {
  fromToken: TokenApiData
  toToken: TokenApiData
  amount: string
  allowance: string
}
