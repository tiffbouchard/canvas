import update from 'immutability-helper';
import type { CSSProperties, FC } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { XYCoord } from 'react-dnd';
import { useDrop } from 'react-dnd';

import { DraggableElement } from './DraggableElement';
import type { CanvasElement } from './interfaces';
import { ItemTypes } from './ItemTypes';
import { useElementContext } from './ElementContext';

const styles: CSSProperties = {
  width: '100vw',
  height: '100vh',
  position: 'relative',
};

export const Container: FC = () => {
  const { elementData, addElement } = useElementContext();
  const [focusedElement, setFocusedElement] = useState<string | null>(null);

  useEffect(() => {
    console.log(elementData);
  }, [elementData]);

  const moveBox = useCallback(
    (id: string, left: number, top: number, type: string, content: string) => {
      // Update elementData in the context
      addElement({
        id,
        type,
        top,
        left,
        content
      });
    },
    [addElement]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ELEMENT,
      drop(item: CanvasElement, monitor) {
        console.log(item)
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top+ delta.y);
        moveBox(item.id, left, top, item.type, item.content);
        return undefined;
      },
    }),
    [moveBox]
  );

  const handleDoubleClick = (id: string) => {
    setFocusedElement(id);
  };

  const handleBlur = () => {
    setFocusedElement(null);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.id)

    const id = event.target.id;
    const type = event.target.type;
    const top = parseInt(event.target.dataset.top ?? '0', 10);
    const left = parseInt(event.target.dataset.left ?? '0', 10);
    const content = event.target.value;

    addElement({
      id,
      type,
      top,
      left,
      content
    });

  };


  return (
    <div ref={drop} style={styles}>
      {elementData.map((element) => (
        <DraggableElement
          key={element.id}
          id={element.id}
          left={element.left}
          top={element.top}
          type={element.type}
          content={element.content}
        >

        {element.type === "text" && (
            <div>
              {element.id === focusedElement ? (
                <input
                  type="text"
                  onBlur={handleBlur}
                  placeholder="Type here..."
                  id={element.id}
                  autoFocus
                  value={element.content}
                  onChange={handleContentChange}
                  data-top={element.top}
                  data-left={element.left}
                />
              ) : (
                <div onDoubleClickCapture={() => handleDoubleClick(element.id) }
                 >
                  {element.content ? element.content : "Double click to edit"}
                </div>
              )}
            </div>
          )}
        {element.type === "image" && <img src=""/>}
        </DraggableElement>
      ))}
    </div>
  );
};
