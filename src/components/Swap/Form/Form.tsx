import React, { useMemo } from 'react'
import { useTokens } from 'api'

import Input from 'components/Input/Input'
import { swapContext } from 'components/Swap/util'

import Price from './Price/Price'
import FastBuy from './FastBuy/FastBuy'
import TokenSelect from './TokenSelect/TokenSelect'
import ExchangeButton from './ExchangeButton/ExchangeButton'


type FormProps = {
  className?: string
}

const Form: React.FC<FormProps> = (props) => {
  const { className } = props

  const { form, fromToken, toToken, sellOptions, buyOptions } = swapContext.useData()

  return (
    <div className={className}>
      <Input
        field={form.fields.buy}
        label="~$10 921.69"
        mask="amount"
        rightNode={(
          <TokenSelect
            className="ml-16"
            label="You buy"
            token={toToken?.symbol}
            image={toToken?.logoURI}
            options={buyOptions}
            withMinButton
            onChange={(value) => form.fields.buyToken.set(value)}
          />
        )}
      />
      <div className="relative mt-4 flex justify-center">
        <ExchangeButton
          className="z-1"
          onClick={() => {
            const { buy, sell, buyToken, sellToken } = form.getValues()

            form.setValues({
              buy: sell,
              sell: buy,
              buyToken: sellToken,
              sellToken: buyToken,
            })
          }}
        />
        <div className="absolute w-full h-px bg-onyx left-0 top-50" />
      </div>
      <Input
        className="mt-4"
        field={form.fields.sell}
        label="~$10 921.69"
        mask="amount"
        rightNode={(
          <TokenSelect
            className="ml-16"
            label="You sell"
            token={fromToken?.symbol}
            image={fromToken?.logoURI}
            options={sellOptions}
            onChange={(value) => form.fields.sellToken.set(value)}
          />
        )}
      />
      <FastBuy
        className="mt-20 mx-6"
        field={form.fields.fastBuy}
      />
      <Price
        className="mt-20"
      />
    </div>
  )
}


export default Form
