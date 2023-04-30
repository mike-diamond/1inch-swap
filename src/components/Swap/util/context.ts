import { useEffect } from 'react'
import { initContext } from 'modules'
import { useQuote, useTokens } from 'api'
import { useForm, useFormState } from 'formular'


export const initialContext: Swap.Context = {
  form: {},
  rate: '',
  initialRate: '',
  toAmount: '0',
  toToken: {},
  fromToken: {},
  estimatedGas: '0',
}

export const {
  Provider,
  useData,
  useInit,
} = initContext<Swap.Context>(initialContext, () => {
  const form = useForm<Swap.Fields>({
    fields: {
      buy: {
        value: '0',
      },
      buyToken: {
        value: 'ETH',
      },
      sell: {
        value: '0',
      },
      sellToken: {
        value: 'USDT',
      },
      fastBuy: {
        value: null,
      },
    }
  })

  const { tokens } = useTokens()
  const { values } = useFormState(form)

  const fromToken = tokens?.[values.sellToken]
  const toToken = tokens?.[values.buyToken]

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
    rate,
    initialRate,
    toAmount,
    toToken,
    fromToken,
    estimatedGas,
  }
})
