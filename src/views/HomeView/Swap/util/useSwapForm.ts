import { useEffect, useMemo } from 'react'
import { useTokens } from 'api'
import { useForm, useFormState } from 'formular'


type Output = Pick<Swap.Context, 'form' | 'values' | 'fromToken' | 'toToken' | 'sellOptions' | 'buyOptions'>

const useSwapForm = (): Output => {
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
  }, [ tokens, fromToken ])

  useEffect(() => {
    const handleChange = (value: string) => {
      if (value === '0') {
        form.fields.buy.set('0')
      }
    }

    form.fields.sell.on('change', handleChange)

    return () => {
      form.fields.sell.off('change', handleChange)
    }
  }, [ form ])

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

  return {
    form,
    values,
    fromToken,
    toToken,
    sellOptions,
    buyOptions,
  }
}


export default useSwapForm
