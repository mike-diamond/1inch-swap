import React, { useState, useCallback, useRef, useId, useEffect } from 'react'
import type { ChangeEventHandler, ReactNode, ChangeEvent } from 'react'
import cx from 'classnames'

import Text from '../../Text/Text'

import s from './InputView.module.scss'


export type InputViewProps = {
  className?: string
  value: string
  label?: string
  rightNode?: ReactNode
  disabled?: boolean
  dataTestId?: string
  isRequired?: boolean
  onBlur?: () => void
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputView: React.FC<InputViewProps> = (props) => {
  const {
    className, value, rightNode, label, disabled, isRequired, dataTestId, onChange, onBlur,
  } = props

  const ref = useRef<HTMLInputElement>(null)
  const [ isFocused, setFocused ] = useState(false)

  const handleBlur = useCallback(() => {
    setFocused(false)

    if (typeof onBlur === 'function') {
      onBlur()
    }
  }, [ onBlur ])

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>((event) => {
    if (typeof onChange === 'function') {
      onChange(event)
    }
  }, [ onChange ])

  useEffect(() => {
    if (isFocused && !disabled && ref.current) {
      ref.current.focus()
    }
  }, [ isFocused, disabled ])

  const controlId = useId()
  const testId = dataTestId || `input-${controlId}`

  const inputClassName = cx('w-full mt-16 text-t16 overflow-ellipsis whitespace-nowrap color-moon', {
    'cursor-default': disabled,
  })

  const inputProps = {
    ref,
    value,
    disabled,
    id: controlId,
    'data-testid': testId,
    'aria-required': isRequired,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onChange: handleChange,
    className: inputClassName,
  }

  return (
    <div
      className={cx(className, s.container, 'bg-onyx radius-30', {
        [s.focused]: isFocused,
      })}
      onClick={disabled ? undefined : handleFocus}
    >
      <div className="p-18 flex items-center">
        <div className="flex-1">
          <Text
            className={s.label}
            message={label || ' '}
            tag="label"
            size="n14"
            color="bluebell"
            htmlFor={controlId}
          />
          <div className="flex items-center">
            <input
              {...inputProps}
              className="w-full text-t24 color-pearl overflow-ellipsis"
            />
          </div>
        </div>
        {rightNode}
      </div>
    </div>
  )
}


export default React.memo(InputView)
