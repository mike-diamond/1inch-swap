import React from 'react'
import cx from 'classnames'

import Icon from 'components/Icon/Icon'
import ButtonBase from 'components/ButtonBase/ButtonBase'

import s from './ExchangeButton.module.scss'


type ExchangeButtonProps = {
  className?: string
  onClick: () => void
}

const ExchangeButton: React.FC<ExchangeButtonProps> = (props) => {
  const { className, onClick } = props

  return (
    <ButtonBase
      className={cx(s.container, className, 'radius-100 p-8')}
      onClick={onClick}
    >
      <Icon
        name="exchange"
        size={24}
        color="pearl"
      />
    </ButtonBase>
  )
}


export default ExchangeButton
