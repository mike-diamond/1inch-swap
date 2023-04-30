import { Form } from 'formular'

import { DropdownProps } from 'components/Dropdown/Dropdown'

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
      rate: number
      initialRate: number
      toAmount: string
      toToken: TokenApiData
      fromToken: TokenApiData
      estimatedGas: number
      sellOptions: DropdownProps['options']
      buyOptions: DropdownProps['options']
    }
  }
}
