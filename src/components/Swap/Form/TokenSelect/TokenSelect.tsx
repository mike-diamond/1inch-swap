import React from 'react'
import cx from 'classnames'
import Image from 'next/image'

import Text from 'components/Text/Text'
import Icon from 'components/Icon/Icon'
import Dropdown, { DropdownProps } from 'components/Dropdown/Dropdown'
import ButtonBase from 'components/ButtonBase/ButtonBase'

import s from './TokenSelect.module.scss'


type TokenSelectProps = {
  className?: string
  label: string
  token?: string
  image?: string
  options: DropdownProps['options']
  withMinButton?: boolean
  onChange: DropdownProps['onChange']
}

const TokenSelect: React.FC<TokenSelectProps> = (props) => {
  const { className, label, token, image, options, withMinButton, onChange } = props

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
        <Dropdown
          options={options}
          position="bottom-right"
          button={(
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
          )}
          onChange={onChange}
        />
      </div>
    </div>
  )
}


export default TokenSelect
