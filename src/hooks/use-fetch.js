import { useRef, useState } from 'react'

export const useFetch = url => {
  const urlRef = useRef(url)

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const refetch = async ({ url = urlRef.current, params = {} }) => {
    setIsLoading(true)

    const paramsQuery = Object.entries(params)
    const paramsQueryString = paramsQuery.length
      ? '/?' + paramsQuery.map(([key, val]) => `${key}=${val}`).join('&')
      : ''

    try {
      const res = await fetch(url + paramsQueryString)

      if (!res.ok) {
        throw new Error(res.status)
      }

      setData(await res.json())
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return { data, isLoading, error, refetch }
}
