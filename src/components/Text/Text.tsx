import React from 'react'
import cx from 'classnames'


const sizesMap = {
  texts: [ 't8', 't24' ],
  notes: [ 'n14' ],
  headers: [ 'h14', 'h16' ],
} as const

export const sizes = [
  ...sizesMap.texts,
  ...sizesMap.notes,
  ...sizesMap.headers,
] as const

export type TextProps = {
  className?: string
  tag?: string
  size: typeof sizes[number]
  color: Color | 'inherit'
  message: string
  htmlFor?: string
  html?: boolean
}

const Text: React.FC<TextProps> = (props) => {
  const { className, tag = 'div', size, color, message, htmlFor, html } = props

  const componentProps = {
    className: cx(className, {
      [`text-${size}`]: size,
      [`color-${color}`]: color !== 'inherit',
    }),
    htmlFor,
  }

  if (html) {
    return React.createElement(tag, {
      ...componentProps,
      dangerouslySetInnerHTML: { __html: message },
    })
  }

  return React.createElement(tag, componentProps, message)
}


export default Text
