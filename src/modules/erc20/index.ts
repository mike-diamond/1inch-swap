import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import abi from './abi.json'
import { Abi } from './types'


const getContract = (address: string, provider: Provider) => (
  new Contract(address, abi, provider) as Abi
)


export default getContract
