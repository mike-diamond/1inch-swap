import { ExternalProvider } from '@ethersproject/providers'


declare global {

  type IconName = (
    'info'
    | 'arrow'
    | 'refresh'
    | 'settings'
    | 'exchange'
  )

  type Color = (
    'banana'
    | 'pearl'
    | 'moonstone'
    | 'bluebell'
    | 'storm'
    | 'navy'
    | 'ink'
    | 'coal'
    | 'onyx'
    | 'raven'
  )

  interface EthereumProvider extends ExternalProvider {
    chainId?: string | number
    netVersion?: string | number
    networkVersion?: string | number
    autoRefreshOnNetworkChange: boolean
    cachedResults: {
      net_version?: Record<'result', string | number>
    }

    request: (params: any) => Promise<any>
    enable: () => Promise<string[]>
    on: (type: string, method: (...args: any) => void) => void
    once: (type: string, method: (...args: any) => void) => void
    removeListener: (type: string, method: (...args: any) => void) => void
  }

  interface Window {
    ethereum?: EthereumProvider
  }
}
