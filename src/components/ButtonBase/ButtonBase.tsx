import React, { forwardRef, useCallback } from 'react'
import cx from 'classnames'

import s from './ButtonBase.module.scss'


export type ButtonBaseProps = {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  id?: string
  tag?: string
  type?: string
  href?: string
  target?: string
  tabIndex?: number
  loading?: boolean
  disabled?: boolean
  dataTestId?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
}

const ButtonBase = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonBaseProps>((props, ref) => {
  const {
    // basic
    children, id, className,

    // modifiers
    disabled, loading,

    // misc
    tag = 'button', type = 'button', tabIndex, dataTestId, onClick, href, target,
  } = props

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (disabled || loading) {
      return
    }

    if (typeof onClick === 'function') {
      onClick(event)
    }
  }, [ onClick, disabled ])

  let node: string | React.ElementType = tag

  let nodeProps: any = {
    ref,
    className: cx(className, s.wrapper, 'inline-flex items-center justify-center', {
      'pointer': !disabled,
      'cursor-default': disabled,
      'pointer-none': loading,
    }),
    id,
    href,
    target,
    disabled,
    tabIndex,
    onClick: handleClick,
    'data-testid': dataTestId,
  }

  if (tag === 'button' || tag === 'input') {
    nodeProps.type = type
  }
  else {
    nodeProps.role = 'button'
  }

  return React.createElement(
    node,
    nodeProps,
    children
  )
})


export default ButtonBase
