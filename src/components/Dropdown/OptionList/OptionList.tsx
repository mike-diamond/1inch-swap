import React, { useCallback, useRef, useState } from 'react'
import { Listbox } from '@headlessui/react'
import cx from 'classnames'

import Option from '../Option/Option'
import ObserverWrapper from '../ObserverWrapper/ObserverWrapper'

import { getDropdownClassName, DropdownPosition } from '../util'

import useKeyboardEvents from './util/useKeyboardEvents'


export type DropdownPlainOption = {
  title: string
  value: string
  image?: string
}

export type DropdownOption = DropdownPlainOption & {
  options?: DropdownPlainOption[]
  onChange?: (value: DropdownPlainOption['value']) => void
}

type OptionListProps = {
  className?: string
  options: DropdownOption[]
  position: DropdownPosition
}

const OptionList: React.FC<OptionListProps> = (props) => {
  const { className, options, position } = props

  const [ positionY, positionX ] = position.split('-')
  const [ listPositionY, setListPositionY ] = useState(positionY)
  const { handleClick, handleKeyDown } = useKeyboardEvents({
    options,
  })

  const optionItems: DropdownOption[] = options

  const dropdownClassName = getDropdownClassName(`${listPositionY}-${positionX}` as DropdownPosition)

  const isBottomPositionRef = useRef(listPositionY === 'bottom')
  isBottomPositionRef.current = listPositionY === 'bottom'

  const onEntry = useCallback((entry: IntersectionObserverEntry | null) => {
    if (entry) {
      const { height, y, bottom } = entry.boundingClientRect

      const isOverflow = isBottomPositionRef.current
        ? height + y > window.innerHeight
        : bottom < height

      if (isOverflow) {
        setListPositionY(isBottomPositionRef.current ? 'top' : 'bottom')
      }
    }
  }, [])

  return (
    <Listbox.Options
      className={cx(dropdownClassName, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <ObserverWrapper
        onEntry={onEntry}
      >
        {
          optionItems.map((option, index) => {
            const { title, value, image } = option

            return (
              <Listbox.Option
                key={index}
                as="div"
                value={value}
              >
                {
                  ({ active, selected }) => (
                    <Option
                      title={title}
                      image={image}
                      active={active || selected}
                    />
                  )
                }
              </Listbox.Option>
            )
          })
        }
      </ObserverWrapper>
    </Listbox.Options>
  )
}


export default React.memo(OptionList)
