import React, { ChangeEvent, useCallback } from 'react'
import { Field, useFieldState } from 'formular'

import InputView, { InputViewProps } from './InputView/InputView'
import masks from './util/masks'


export type InputProps = Omit<InputViewProps, 'error' | 'value'> & {
  field: Field<string>
  mask?: string
}

const Input: React.FC<InputProps> = (props) => {
  const {
    className, field, label, mask, disabled, dataTestId, isRequired, rightNode,
  } = props

  const { value } = useFieldState(field)

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    const applyMask = masks[mask as keyof typeof masks]

    if (typeof applyMask === 'function') {
      value = applyMask(event)
    }

    field.set(value)
  }, [ mask, field ])

  const handleBlur = useCallback(() => {
    if (field.state.value === '') {
      field.set('0')
    }
    if (/\./.test(field.state.value)) {
      const formattedValue = field.state.value
        .replace(/0+$/, '')
        .replace(/\.$/, '')

      field.set(formattedValue)
    }
  }, [ field ])

  return (
    <InputView
      className={className}
      value={value}
      label={label}
      rightNode={rightNode}
      disabled={disabled}
      dataTestId={dataTestId}
      isRequired={isRequired}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  )
}


export default Input
