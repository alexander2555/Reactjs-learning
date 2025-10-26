import { useHover } from '../hooks/use-hover'

function Demo() {
  const { hovered, ref } = useHover()

  return <div ref={ref}>{hovered ? 'На меня навели мышку' : 'Наведи мышкой на меня'}</div>
}

export default Demo
