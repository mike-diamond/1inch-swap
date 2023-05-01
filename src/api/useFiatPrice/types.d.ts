type Price = {
  usd: number
}
export type ApiData = {
  '1inch': Price
  arbitrum: Price
  ethereum: Price
  tether: Price
  'usd-coin': Price
}

export type Input = {
  value: string
  token?: string
}
