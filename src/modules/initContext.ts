import React, { useContext } from 'react'


const initContext = <T extends unknown, A = undefined>(
  initialContext: T,
  logic: (args?: A) => T
) => {
  const Context = React.createContext<T>(initialContext)
  const Provider = Context.Provider

  const useData = () => useContext<T>(Context)
  const useInit = (...args: undefined extends A ? [params?: A] : [params: A]): T => logic(...args)

  return { Provider, useData, useInit }
}


export default initContext
