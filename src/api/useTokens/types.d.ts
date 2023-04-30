type TokenApiData = {
  name: string
  symbol: string
  decimals: number
  address: string
  logoURI: string
  tags: string[]
}

export type ApiData = {
  tokens: Record<string, TokenApiData>
}
