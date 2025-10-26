import { useFetch } from '../hooks/use-fetch.js'

function Demo() {
  const { data, isLoading, error, refetch } = useFetch('')

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
