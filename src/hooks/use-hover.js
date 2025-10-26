import { useEffect, useRef, useState } from 'react'

export const useHover = () => {
  const ref = useRef()

  const [hovered, setHovered] = useState(false)

  const onMouseOver = () => setHovered(true)
  const onMouseOut = () => setHovered(false)

  useEffect(() => {
    const refEl = ref.current

    refEl.addEventListener('mouseover', onMouseOver)
    refEl.addEventListener('mouseout', onMouseOut)

    return () => {
      refEl.removeEventListener('mouseover', onMouseOver)
      refEl.removeEventListener('mouseout', onMouseOut)
    }
  }, [])

  return { hovered, ref }
}
