import React from 'react'
import cx from 'classnames'

import Text from 'components/Text/Text'

import ButtonBase, { ButtonBaseProps } from '../ButtonBase/ButtonBase'

import s from './Button.module.scss'


export type ButtonProps = ButtonBaseProps & {
  className?: string
  title: string
}

const Button: React.FC<ButtonProps> = (props) => {
  const { className, title, type, disabled, dataTestId, onClick } = props

  return (
    <ButtonBase
      className={cx(s.button, className, 'text-center radius-16', {
        'opacity-72': disabled,
      })}
      disabled={disabled}
      type={type}
      dataTestId={dataTestId}
      onClick={onClick}
    >
      <Text
        className="overflow-ellipsis"
        message={title}
        size="h16"
        color="pearl"
      />
    </ButtonBase>
  )
}


export default Button
