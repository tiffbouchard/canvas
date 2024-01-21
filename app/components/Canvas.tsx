import type { FC } from 'react'

import { Container } from './Container'

export const Canvas: FC = () => {
//   const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
//   const toggle = useCallback(
//     () => setHideSourceOnDrag(!hideSourceOnDrag),
//     [hideSourceOnDrag],
//   )

  return (
    <div>
      <Container />
    </div>
  )
}
