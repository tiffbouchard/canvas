import React from 'react';
import './Menu.css';

interface ElementsMenuProps {
  onAddElement: (elementType: 'text' | 'image') => void;
}

const Menu: React.FC<ElementsMenuProps> = ({ onAddElement }) => {
  return (
    <div className="elements-menu">
      <button onClick={() => onAddElement('text')}>Add Text</button>
      <button onClick={() => onAddElement('image')}>Add Image</button>
    </div>
  );
};

export default Menu;
