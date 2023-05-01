import React from 'react'
import cx from 'classnames'
import { Field, useFieldState } from 'formular'

import Text from 'components/Text/Text'
import ButtonBase from 'components/ButtonBase/ButtonBase'

import s from './FastBuy.module.scss'


type FastBuyProps = {
  className?: string
  field: Field<number | null>
}

const options = [ 25, 50, 75, 100 ]

const FastBuy: React.FC<FastBuyProps> = (props) => {
  const { className, field } = props

  const { value } = useFieldState(field)

  return (
    <div className={cx(className, 'flex justify-between')}>
      {
        options.map((option, index) => {
          const isActive = option == value

          return (
            <ButtonBase
              key={index}
              className={cx(s.button, 'px-24 py-4 bg-onyx radius-8', {
                [s.active]: isActive,
              })}
              onClick={() => isActive ? field.set(null) : field.set(option)}
            >
              <Text
                message={`${option}%`}
                color="inherit"
                size="n14"
              />
            </ButtonBase>
          )
        })
      }
    </div>
  )
}


export default FastBuy
