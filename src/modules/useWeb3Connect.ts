import { useEffect, useState, useCallback } from 'react'

import localStorage from './local-storage'


const useWeb3Connect = () => {
  const [ { address, chain, isConnecting }, setState ] = useState({
    chain: typeof window !== 'undefined' ? window.ethereum?.networkVersion : 1,
    address: '',
    isConnecting: false,
  })

  useEffect(() => {
    if (address) {
      localStorage.setItem('address', address)

      return () => {
        console.log('remove')
        localStorage.removeItem('address')
      }
    }
  }, [ address ])

  const connect = useCallback(async () => {
    if (window.ethereum) {
      try {
        const [ address ] = await window.ethereum.enable()

        const chain = Number(window.ethereum?.networkVersion)

        setState({ address, chain, isConnecting: false })
      }
      catch (error) {
        console.error({ error })
        setState({ address: '', chain: 1, isConnecting: false })
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
    connect,
  }
}


export default useWeb3Connect
