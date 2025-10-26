type LocalStorageSetValue = string
type LocalStorageReturnValue = LocalStorageSetValue | null

type UseLocalStorage = (key: string) => [
  value: LocalStorageReturnValue,
  {
    setItem: (value: LocalStorageSetValue) => void
    removeItem: () => void
  },
]

import { useRef, useState } from 'react'

export const useLocalStorage: UseLocalStorage = key => {
  const [value, setValue] = useState(localStorage.getItem(key))

  const itemKey = useRef(key)

  const setItem = (val: LocalStorageSetValue) => {
    localStorage.setItem(itemKey.current, val)
    setValue(val)
  }

  const removeItem = () => {
    localStorage.removeItem(itemKey.current)
    setValue(null)
  }

  return [value, { setItem, removeItem }]
}
