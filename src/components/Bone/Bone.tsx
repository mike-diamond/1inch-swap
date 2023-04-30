import React, { useMemo, CSSProperties } from 'react'
import cx from 'classnames'


export type BoneProps = {
  className?: string
  w?: number
  h?: number
  wFull?: boolean
  delay?: number
  aspect?: number
  styles?: CSSProperties
}

const Bone: React.FC<BoneProps> = (props) => {
  const {
    className,
    w: width, h: height, styles = {},
    wFull, delay, aspect,
  } = props

  const style = useMemo(() => {
    const style: any = styles

    if (width) {
      style.width = style.minWidth = `${width}rem`
    }

    if (height) {
      style.height = style.minHeight = `${height}rem`
    }

    return style
  }, [ width, height, styles ])

  const placeholderStyle = useMemo(() => {
    if (aspect) {
      return {
        paddingTop: `${Math.round(100 / aspect)}%`,
      }
    }
  }, [ aspect ])

  const boneClassName = cx(className, 'relative bone', {
    'radius-4': !/radius/.test(className || ''),
    'w-full': wFull,
  })

  return (
    <div
      className={boneClassName}
      style={style}
    >
      {
        Boolean(placeholderStyle) && (
          <div style={placeholderStyle} />
        )
      }
    </div>
  )
}


export default React.memo(Bone)
