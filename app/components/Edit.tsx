import { useState } from 'react'
import {Canvas} from './Canvas'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Menu from './Menu'
import { v4 as uuidv4 } from 'uuid';
import { useElementContext } from './ElementContext'
import { CanvasElement } from './interfaces'

function Edit() {
  // const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const { elementData, addElement } = useElementContext();

  const generateUniqueId = (): string => {
    return uuidv4();
  };

  // const handleAddElement = (elementType: 'text' | 'image') => {
  //   const newElement: CanvasElement = {
  //     id: generateUniqueId(),
  //     type: elementType,
  //     position: { x: 500, y: 100 }, // amke randoms Set initial position as needed
  //     // Add more properties as needed 
  //   };
    

  //   setCanvasElements((prevElements) => [...prevElements, newElement]);
  //   console.log(canvasElements)
  // };

  const handleAddElement = (elementType: 'text' | 'image') => {
    const newElement: CanvasElement = {
      id: generateUniqueId(),
      type: elementType,
      left: 500,
      top: 200,
      content: ""
    };
    addElement(newElement);
  };

  return (
    <div>
      <Menu onAddElement={handleAddElement}/>
      <DndProvider backend={HTML5Backend}>
        <Canvas />
      </DndProvider>
    </div>
  )
}

export default Edit;