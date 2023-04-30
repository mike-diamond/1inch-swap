import { Form } from 'formular'

import { TokenApiData } from '../../api/useQuote/types'


declare global {

  declare namespace Swap {

    type Fields = {
      buy: string
      buyToken: string
      sell: string
      sellToken: string
      fastBuy: number | null
    }

    type Context = {
      form: Form<Fields>
      rate: string
      initialRate: string
      toAmount: string
      toToken: TokenApiData
      fromToken: TokenApiData
      estimatedGas: string
    }
  }
}
