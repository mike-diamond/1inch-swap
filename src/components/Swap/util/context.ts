import { useEffect, useMemo } from 'react'
import { initContext } from 'modules'
import { useQuote, useTokens } from 'api'
import { useForm, useFormState } from 'formular'


export const initialContext: Swap.Context = {
  rate: 0,
  toAmount: '0',
  initialRate: 0,
  estimatedGas: 0,
  // @ts-ignore
  form: {},
  // @ts-ignore
  values: {},
  // @ts-ignore
  toToken: {},
  // @ts-ignore
  fromToken: {},
  sellOptions: [],
  buyOptions: [],
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

  const sellOptions = useMemo(() => {
    if (tokens && toToken) {
      return Object.keys(tokens)
        .filter((key) => key !== toToken.symbol)
        .map((key) => {
          const token = tokens[key]

          return {
            title: token.symbol,
            image: token.logoURI,
            value: token.symbol,
          }
        })
    }

    return []
  }, [ tokens, toToken ])

  const buyOptions = useMemo(() => {
    if (tokens && fromToken) {
      return Object.keys(tokens)
        .filter((key) => key !== fromToken.symbol)
        .map((key) => {
          const token = tokens[key]

          return {
            title: token.symbol,
            image: token.logoURI,
            value: token.symbol,
          }
        })
    }

    return []
  }, [ tokens, toToken ])

  useEffect(() => {
    if (sellOptions.length && !fromToken) {
      form.fields.sellToken.set(sellOptions[0].value)
    }
  }, [ form, fromToken, sellOptions ])

  useEffect(() => {
    if (buyOptions.length && !toToken) {
      form.fields.buyToken.set(buyOptions[0].value)
    }
  }, [ form, toToken, buyOptions ])

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
