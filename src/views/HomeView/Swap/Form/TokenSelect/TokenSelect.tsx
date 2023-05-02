import React, { useMemo } from 'react'
import cx from 'classnames'
import Image from 'next/image'

import Text from 'components/Text/Text'
import Icon from 'components/Icon/Icon'
import ButtonBase from 'components/ButtonBase/ButtonBase'
import Dropdown, { DropdownProps } from 'components/Dropdown/Dropdown'

import s from './TokenSelect.module.scss'

import arbImage from './image/arb.svg'
import ethImage from './image/eth.svg'



type TokenSelectProps = {
  className?: string
  label: string
  token?: string
  image?: string
  options: DropdownProps['options']
  max?: string
  onChange: DropdownProps['onChange']
  onMaxButtonClick?: () => void
}

const tokenImages = {
  ETH: ethImage.src,
  ARB: arbImage.src,
}

const TokenSelect: React.FC<TokenSelectProps> = (props) => {
  const { className, label, token, image, options, max, onChange, onMaxButtonClick } = props

  const tokenImage = tokenImages[token as keyof typeof tokenImages] || image

  const modifiedOptions = useMemo(() => (
    options.map((option) => {
      return {
        ...option,
        image: tokenImages[option.title as keyof typeof tokenImages] || option.image,
      }
    })
  ), [ options ])

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
          Number(max) > 0 && (
            <ButtonBase
              className={cx(s.buttonMin, 'bg-coal px-12 mr-12 radius-8 uppercase')}
              onClick={onMaxButtonClick}
            >
              <Text
                message="Max"
                size="t8"
                color="pearl"
              />
            </ButtonBase>
          )
        }
        <Dropdown
          options={modifiedOptions}
          position="bottom-right"
          button={(
            <ButtonBase
              className={cx(s.button, 'flex items-center bg-coal pl-4 py-4 pr-8')}
            >
              {
                Boolean(tokenImage) && (
                  <Image
                    className="mr-4"
                    src={tokenImage as string}
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
