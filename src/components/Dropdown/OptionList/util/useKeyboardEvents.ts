import { KeyboardEventHandler, useCallback, useState } from 'react'

import { DropdownOption } from '../OptionList'


type UseKeyboardEventsProps = {
  options: DropdownOption[]
}

const useKeyboardEvents = ({ options }: UseKeyboardEventsProps) => {
  const [ activeOption, setActiveOption ] = useState<number | null>(null)

  const handleClick = useCallback(() => {
    setActiveOption(null)
  }, [])

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLUListElement>>((event) => {
    if (options[0].options?.length) {
      const isUp = event.key === 'ArrowUp'
      const isDown = event.key === 'ArrowDown'
      const isEnter = event.key === 'Enter' || event.key === 'ArrowRight'

      if (isEnter) {
        event.preventDefault()

        setActiveOption((activeOption) => {
          return activeOption
        })
      }
      else if (isUp || isDown) {
        setActiveOption((activeOption) => {
          if (activeOption === null) {
            return isUp ? options.length -1 : 0
          }

          const nextIndex = isUp ? activeOption - 1 : activeOption + 1

          if (nextIndex >= 0 && nextIndex < options.length) {
            return nextIndex
          }

          return activeOption
        })
      }
    }
  }, [ options ])

  return {
    activeOption,
    handleClick,
    handleKeyDown,
  }
}


export default useKeyboardEvents
