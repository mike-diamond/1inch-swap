import React, { Fragment, ReactElement } from 'react'
import cx from 'classnames'
import { Listbox } from '@headlessui/react'

import type { DropdownPosition } from './util'
import OptionList, { DropdownOption } from './OptionList/OptionList'

import s from './Dropdown.module.scss'


export type DropdownProps = {
  className?: string
  disabled?: boolean
  button: ReactElement
  value?: DropdownOption['value']
  options: DropdownOption[]
  position?: DropdownPosition
  withArrow?: boolean
  onChange?: (value: DropdownOption['value']) => void
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    className, button, value, options, disabled, withArrow,
    position = 'bottom-left', onChange,
  } = props

  const hasOffset = Boolean(options[0]?.options)

  return (
    <div className={cx(className, s.dropdown, 'inline-flex relative')}>
      <Listbox
        disabled={disabled}
        value={value}
        onChange={onChange}
      >
        <Listbox.Button as={Fragment}>
          {
            ({ open }) => (
              withArrow
                ? (
                  React.cloneElement(button as ReactElement, {
                    arrow: open ? 'up' : 'down',
                  })
                )
                : button
            )
          }
        </Listbox.Button>
        <OptionList
          className={cx(s.options, 'absolute radius-8 bg-coal overflow-hidden', {
            'py-8': hasOffset,
          })}
          options={options}
          position={position}
        />
      </Listbox>
    </div>
  )
}


export default React.memo(Dropdown)
