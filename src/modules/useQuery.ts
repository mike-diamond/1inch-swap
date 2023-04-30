import { useCallback, useEffect, useMemo, useRef, useState } from 'react'


const apiDomain = 'https://api.1inch.io/v5.0'

type State<Data> = {
  data: Data | null
  error: string | null
}

type Output<Data> = State<Data> & {
  isFetching: boolean
}

const useQuery = <Data>(url: string, cache: RequestCache = 'no-cache'): Output<Data> => {
  const [ state, setState ] = useState<State<Data>>({
    data: null,
    error: null,
  })

  const urlRef = useRef('')

  const handleRequest = useCallback(() => {
    const controller = new AbortController()
    const fullUrl = /^https?:\/\//.test(url) ? url : `${apiDomain}${url}`

    const request = fetch(fullUrl, {
      method: 'GET',
      signal: controller.signal,
      cache,
    })
      .then((data) => {
        if (data.status === 200) {
          return data.json() as Promise<Data>
        }

        const statusErrors = {
          400: 'Bad Request The request was unacceptable, often due to missing a required parameter.',
          404: 'Not Found The requested resource doesn’t exist.',
        }

        const error = statusErrors[data.status as keyof typeof statusErrors]

        return Promise.reject(error || 'Something went wrong')
      })
      .then((data) => {
        urlRef.current = url
        setState({ data, error: null })
      })
      .catch((error) => {
        if (error.code !== 20) {
          console.log('UseQuery error', { error })
          urlRef.current = url
          setState({
            data: null,
            error: error?.message || error,
          })
        }
      })

    return {
      request,
      controller,
    }
  }, [ url, cache, setState ])

  useEffect(() => {
    if (url) {
      const { controller } = handleRequest()

      return () => {
        controller.abort()
      }
    }
  }, [ url, setState, handleRequest ])

  return useMemo(() => {
    const isUrlUpdated = url && urlRef.current !== url

    if (isUrlUpdated) {
      return {
        data: null,
        error: null,
        isFetching: true,
      }
    }

    return {
      ...state,
      isFetching: false,
    }
  }, [ url, state ])
}


export default useQuery