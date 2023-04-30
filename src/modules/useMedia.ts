import { useCallback, useEffect, useState } from 'react'

import useEventListener from './useEventListener'


const useMedia = () => {
  const [ isDesktop, setDesktop ] = useState(true)

  const checkDesktop = useCallback(() => {
    if (typeof window.matchMedia === 'function') {
      const isDesktop = window.matchMedia?.(`(min-width: 569px)`).matches

      setDesktop(isDesktop)
    }
  }, [])

  useEventListener('resize', checkDesktop)

  useEffect(() => {
    checkDesktop()
  }, [])

  return {
    isDesktop,
    isMobile: !isDesktop,
  }
}


export default useMedia
