import React, { useRef, useMemo, useEffect } from 'react'

import createObserver, { CreateObserverResult } from './createObserver'
import useDeepMemo from './useDeepMemo'


type Listener = (entry: IntersectionObserverEntry) => void

export type Opts = Partial<IntersectionObserverInit & {
  once: boolean
}>

export type UseEntryListenerResult = {
  ref: React.RefObject<any>,
  observer: CreateObserverResult,
}

// Calls callback on element entry
const useEntryListener = (listener: Listener, opts: Opts = {}): UseEntryListenerResult => {
  const ref = useRef<any>()

  // Prevent infinity updates
  const options = useDeepMemo(() => opts, [ opts ])

  const observer = useMemo(() => {
    const { once, ...observerProps } = opts || {}

    return createObserver(ref, observerProps)
  }, [ options ])

  useEffect(() => {
    observer?.observe((entry) => {
      if (opts.once) {
        // setEntry called once when target become visible in viewport
        if (entry.isIntersecting) {
          listener(entry)
          observer.unobserve()
        }
      }
      else {
        listener(entry)
      }
    })

    return () => {
      observer?.unobserve()
    }
  }, [ observer ])

  return {
    ref,
    observer,
  }
}


export default useEntryListener
