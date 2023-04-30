import React from 'react'
import cx from 'classnames'

import Text from '../../Text/Text'
import Icon from '../../Icon/Icon'

import s from './Option.module.scss'
import Image from 'next/image'


type OptionProps = {
  className?: string
  title: string
  image?: string
  active?: boolean
  onClick?: () => void
}

const Option: React.FC<OptionProps> = (props) => {
  const { className, title, image, active, onClick } = props

  return (
    <div
      className={cx(s.option, className, 'flex items-center pl-16 pr-24 pointer', {
        'bg-coal': active,
      })}
      onClick={onClick}
    >
      {
        Boolean(image) && (
          <Image
            className="mr-4"
            src={image as string}
            width={32}
            height={32}
            alt={title as string}
          />
        )
      }
      <Text
        message={title}
        size="h14"
        color="pearl"
      />
    </div>
  )
}


export default React.memo(Option)
