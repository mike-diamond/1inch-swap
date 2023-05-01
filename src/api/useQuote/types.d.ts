export type TokenApiData = {
  name: string
  symbol: string
  decimals: number
  address: string
  logoURI: string
  tags: string[]
}

type Protocol = {
  name: string
  part: number
  fromTokenAddress: string
  toTokenAddress: string
}

export type ApiData = {
  fromToken: TokenApiData
  toToken: TokenApiData
  toTokenAmount: string
  fromTokenAmount: string
  estimatedGas: number
  protocols: Protocol[][][]
}

export type Input = {
  fromToken?: TokenApiData
  toToken?: TokenApiData
  amount: string
  cache?: RequestCache
}
