import { useCallback, useEffect, useMemo, useState } from 'react'
import { Web3Provider } from '@ethersproject/providers'

import initContext from '../initContext'
import localStorage from '../local-storage'


export const initialContext: Web3.Context = {
  chain: typeof window !== 'undefined' ? Number(window.ethereum?.networkVersion) || 1 : 1,
  address: '',
  isConnecting: false,
  provider: null,
  connect: () => {},
}

export const {
  Provider,
  useData,
  useInit,
} = initContext<Web3.Context>(initialContext, () => {
  const [ { address, chain, isConnecting }, setState ] = useState({
    chain: typeof window !== 'undefined' ? Number(window.ethereum?.networkVersion) || 1 : 1,
    address: '',
    isConnecting: false,
  })

  const provider = useMemo(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      return new Web3Provider(window.ethereum)
    }

    return null
  }, [])

  useEffect(() => {
    if (address) {
      localStorage.setItem('address', address)

      return () => {
        localStorage.removeItem('address')
      }
    }
  }, [ address ])

  const connect = useCallback(async () => {
    if (window.ethereum) {
      try {
        const [ address ] = await window.ethereum.enable()

        const chain = Number(window.ethereum?.networkVersion)

        console.log('set', address)
        setState({ address, chain, isConnecting: false })
      }
      catch (error) {
        console.error({ error })
        setState((state) => ({ ...state, address: '', isConnecting: false }))
      }
    }
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      // Reconnect on metaMask disconnect
      window.ethereum.on('accountsChanged', () => {
        setState({ address: '', chain: Number(window.ethereum?.networkVersion) || 1, isConnecting: false })
        connect()
      })

      window.ethereum.on('chainChanged', () => {
        setState((state) => ({ ...state, chain: Number(window.ethereum?.networkVersion) || 1 }))
      })

      const isConnected = localStorage.getItem('address')

      if (isConnected) {
        connect()
      }
    }
  }, [ connect ])

  return {
    chain,
    address,
    isConnecting,
    provider,
    connect,
  }
})
