import { ChangeEvent } from 'react'

import formatInteger from '../../../api/useFiatPrice/formatInteger'


export const createMask = (formula: string) => {
  const patternArray = formula.split('')

  return (event: ChangeEvent<HTMLInputElement>, value: string) => {
    if (!value) {
      return ''
    }

    let result = '', index = 0

    for (let i = 0; i < patternArray.length; i++) {
      if (!value[index]) {
        break
      }

      const symbol = patternArray[i]

      result += symbol === 'X'
        ? value[index++]
        : symbol
    }

    return result
  }
}

type CreateMaskWithModifiers = (params: {
  mask: string
  preModify?: (event: ChangeEvent<HTMLInputElement>, value: string) => string
  postModify?: (event: ChangeEvent<HTMLInputElement>, value: string) => string
}) => (event: ChangeEvent<HTMLInputElement>) => string

const createMaskWithModifiers: CreateMaskWithModifiers = ({ mask, preModify, postModify }) => {
  const applyMask = mask && createMask(mask)

  return (event) => {
    let newValue = event.target.value

    if (typeof preModify === 'function') {
      newValue = preModify(event, newValue)
    }

    if (typeof applyMask === 'function') {
      newValue = applyMask(event, newValue)
    }

    if (typeof postModify === 'function') {
      newValue = postModify(event, newValue)
    }

    return newValue
  }
}

// Mask result: 1000000.999 => 1 000 000.999
const initAmountMask = (): ReturnType<CreateMaskWithModifiers> => {
  let lastValue = '0'

  const preModify = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    // Remove any non-digit characters except for periods
    return value.replace(/[^\d.]/g, '')
  }

  const postModify = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    if (value) {
      value = formatInteger(value)
    }

    // adjust cursor position based on modifications made to the value
    const input = event.target
    const cursorPosition = input.selectionStart || 0
    let newCursorPosition = value.length - lastValue.length === 2
      ? cursorPosition + 1
      : cursorPosition

    // check if the key pressed was backspace and cursor is before a space
    const nativeEvent = event.nativeEvent as Event & Record<'inputType', string>

    if (nativeEvent.inputType === 'deleteContentBackward' && value.charAt(cursorPosition) === ' ') {
      value = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition + 1)
      value = formatInteger(value)

      newCursorPosition = cursorPosition - 1
    }

    // set the cursor position
    if (typeof input.setSelectionRange === 'function') {
      setTimeout(() => {
        input.setSelectionRange(newCursorPosition, newCursorPosition)
      })
    }

    lastValue = value || '0'

    return value
  }

  return createMaskWithModifiers({
    mask: '',
    preModify,
    postModify,
  })
}


export default {
  amount: initAmountMask(),
}
