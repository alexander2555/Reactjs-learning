import { useState } from 'react'
// import { useFetch } from './useFetch'

function Demo() {
  // const {
  //   data,
  //   isLoading,
  //   error,
  //   refetch
  // } = useFetch('https://jsonplaceholder.typicode.com/posts')

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const refetch = async ({
    url = 'https://jsonplaceholder.typicode.com/posts',
    params = {},
  }) => {
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

  return (
    <div>
      <div>
        <button
          onClick={() =>
            refetch({
              params: {
                _limit: 3,
              },
            })
          }
        >
          Перезапросить
        </button>
      </div>
      {isLoading && 'Загрузка...'}
      {error && `Произошла ошибка: ${error}`}
      {data && !isLoading && data.map(item => <div key={item.id}>{item.title}</div>)}
    </div>
  )
}

export default Demo
