import React, { CSSProperties, useMemo } from 'react'
import cx from 'classnames'

import images from './util/images'


export const sizes = [ 14, 16, 20, 24 ] as const

export type IconProps = {
  className?: string
  name: IconName
  size?: typeof sizes[number]
  color?: Color | 'inherit'
}

const Icon: React.FC<IconProps> = (props) => {
  const { className, name, size = 20, color = 'bluebell' } = props

  const image = images[name]

  const dimensions = useMemo<CSSProperties>(() => {
    const remSize = `${size}rem`

    return {
      width: remSize,
      height: remSize,
    }
  }, [ size ])

  const style = useMemo(() => {
    if (image?.src) {
      const url = `url(${image.src})`

      if (color) {
        return {
          ...dimensions,
          maskImage: url,
          WebkitMaskImage: url,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center center',
          WebkitMaskSize: 'contain',
        }
      }

      return {
        ...dimensions,
        backgroundImage: url,
      }
    }

    return {}
  }, [ image, color, dimensions ])

  return (
    <div
      className={cx(className, 'inline-block', {
        [`bg-${color}`]: Boolean(color),
      })}
      style={style}
    />
  )
}


export default Icon
