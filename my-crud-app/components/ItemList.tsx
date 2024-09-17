import React from 'react';

interface Item {
  id: number;
  name: string;
}

interface ItemListProps {
  items: Item[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, name: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onUpdate }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => onDelete(item.id)}>Excluir</button>
          <button onClick={() => {
            const newName = prompt('Novo nome:', item.name);
            if (newName) onUpdate(item.id, newName);
          }}>Editar</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;