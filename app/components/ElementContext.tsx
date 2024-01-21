// ElementContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CanvasElement } from './interfaces';
import update from 'immutability-helper';

interface ElementContextProps {
  elementData: CanvasElement[];
  addElement: (newElement: CanvasElement) => void;
}

const ElementContext = createContext<ElementContextProps | undefined>(undefined);

interface ElementProviderProps {
  children: ReactNode;
}

export const ElementProvider: React.FC<ElementProviderProps> = ({ children }) => {
  const [elementData, setElementData] = useState<CanvasElement[]>([]);

  // const addElement = (newElement: CanvasElement) => {
  //   setElementData((prevData) => {
  //     const index = prevData.findIndex((element) => element.id === newElement.id);
  
  //     if (index !== -1) {
  //       // If element with the same id exists, update it
  //       const updatedData = [...prevData];
  //       updatedData[index] = newElement;
  //       return updatedData;
  //     } else {
  //       // If not, add the new element
  //       return [...prevData, newElement];
  //     }
  //   });
  // };

  const addElement = (newElement: CanvasElement) => {
    setElementData((prevData) => {
      const index = prevData.findIndex((element) => element.id === newElement.id);

      if (index !== -1) {
        // If element with the same id exists, update only the necessary properties
        const updatedData = update(prevData, {
          [index]: {
            $merge: {
              top: newElement.top,
              left: newElement.left,
              content: newElement.content,
              // Add other properties you want to update here
            },
          },
        });

        return updatedData;
      } else {
        // If not, add the new element
        return [...prevData, newElement];
      }
    });
  };

  return (
    <ElementContext.Provider value={{ elementData, addElement }}>
      {children}
    </ElementContext.Provider>
  );
};

export const useElementContext = (): ElementContextProps => {
  const context = useContext(ElementContext);
  if (!context) {
    throw new Error('useElementContext must be used within an ElementProvider');
  }
  return context;
};
