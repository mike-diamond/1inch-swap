import React, { ReactNode, useEffect } from 'react'

import { observer } from 'modules'


export type ObserverWrapperProps = {
  className?: string
  children: ReactNode | ReactNode[]
  onEntry?: (entry: IntersectionObserverEntry | null) => void
  onClose?: () => void
}

const ObserverWrapper: React.FC<ObserverWrapperProps> = (props) => {
  const { children, onEntry, onClose } = props

  const { ref, entry, isVisible } = observer.useEntry({
    threshold: 0.9999,
  })

  useEffect(() => {
    if (typeof onEntry === 'function' && !isVisible) {
      onEntry(entry)
    }
  }, [ entry, isVisible, onEntry ])

  useEffect(() => {
    if (typeof onClose === 'function') {
      return () => {
        onClose()
      }
    }
  }, [ onClose ])

  return (
    <div ref={ref}>
      {children}
    </div>
  )
}


export default React.memo(ObserverWrapper)
