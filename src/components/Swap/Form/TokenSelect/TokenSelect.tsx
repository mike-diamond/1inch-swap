import React from 'react'
import cx from 'classnames'
import Image from 'next/image'

import Text from 'components/Text/Text'
import Icon from 'components/Icon/Icon'
import ButtonBase from 'components/ButtonBase/ButtonBase'

import s from './TokenSelect.module.scss'


type TokenSelectProps = {
  className?: string
  label: string
  token?: string
  image?: string
  withMinButton?: boolean
}

const TokenSelect: React.FC<TokenSelectProps> = (props) => {
  const { className, label, token, image, withMinButton } = props

  return (
    <div className={className}>
      <Text
        className="text-right"
        message={label}
        color="bluebell"
        size="n14"
      />
      <div className="flex items-center mt-4">
        {
          withMinButton && (
            <ButtonBase
              className={cx(s.buttonMin, 'bg-coal px-12 mr-12 radius-8 uppercase')}
            >
              <Text
                message="Min"
                size="t8"
                color="pearl"
              />
            </ButtonBase>
          )
        }
        <ButtonBase
          className={cx(s.button, 'flex items-center bg-coal pl-4 py-4 pr-8')}
        >
          {
            Boolean(image) && (
              <Image
                className="mr-4"
                src={image as string}
                width={32}
                height={32}
                alt={token as string}
              />
            )
          }
          <Text
            message={token || ''}
            size="h14"
            color="pearl"
          />
          <Icon
            className="ml-8"
            size={16}
            name="arrow"
            color="pearl"
          />
        </ButtonBase>
      </div>
    </div>
  )
}


export default TokenSelect
