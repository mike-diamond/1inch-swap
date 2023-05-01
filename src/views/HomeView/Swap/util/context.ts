import { useEffect } from 'react'
import { useQuote } from 'api'
import { initContext } from 'modules'

import useSwapForm from './useSwapForm'


export const initialContext: Swap.Context = {
  rate: 0,
  toAmount: '0',
  initialRate: 0,
  estimatedGas: 0,
  sellOptions: [],
  buyOptions: [],
  // @ts-ignore
  form: {},
  // @ts-ignore
  values: {},
}

export const {
  Provider,
  useData,
  useInit,
} = initContext<Swap.Context>(initialContext, () => {
  const { form, values, fromToken, toToken, sellOptions, buyOptions } = useSwapForm()

  const { rate, toAmount, estimatedGas } = useQuote({
    fromToken,
    toToken,
    amount: values.sell,
  })

  const { rate: initialRate } = useQuote({
    fromToken,
    toToken,
    amount: '1',
    cache: 'force-cache',
  })

  useEffect(() => {
    if (toAmount) {
      form.fields.buy.set(toAmount)
    }
    else {
      form.fields.buy.set('0')
    }
  }, [ form, toAmount ])

  return {
    form,
    values,
    rate,
    initialRate,
    toAmount,
    toToken,
    fromToken,
    estimatedGas,
    sellOptions,
    buyOptions,
  }
})
