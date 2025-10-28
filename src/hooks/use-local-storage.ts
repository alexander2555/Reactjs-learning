type LocalStorageSetValue = string
type LocalStorageReturnValue = LocalStorageSetValue | null

type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void
    removeItem: () => void
  },
]

import { useCallback, useRef, useState } from 'react'

export const useLocalStorage: UseLocalStorage = key => {
  const [value, setValue] = useState(localStorage.getItem(key))

  const itemKey = useRef(key)

  const setItem = useCallback(
    (val: LocalStorageSetValue) => {
      localStorage.setItem(itemKey.current, val)
      setValue(val)
    },
    [key],
  )

  const removeItem = useCallback(() => {
    localStorage.removeItem(itemKey.current)
    setValue(null)
  }, [key])

  return [value, { setItem, removeItem }]
}
