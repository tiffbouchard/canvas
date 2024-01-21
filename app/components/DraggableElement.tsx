import type { CSSProperties, FC, ReactNode } from 'react'
import { useDrag } from 'react-dnd'

import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {
  position: 'absolute',
  cursor: 'grab',
}

export interface BoxProps {
  id: any
  left: number
  top: number
  type: string
  children?: ReactNode
  content: string
}

export const DraggableElement: FC<BoxProps> = ({
  id,
  left,
  top,
  type,
  children,
  content
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.ELEMENT,
      item: { id, left, top, type, content},
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, type, content],
  )

  if (isDragging) {
    return <div ref={drag} />
  }
  return (
    <div
      ref={drag}
      style={{ ...style, left, top }}
    >
      {children}
    </div>
  )
}
