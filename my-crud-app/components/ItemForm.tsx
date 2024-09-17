import React, { useState } from 'react';

interface ItemFormProps {
  onSubmit: (name: string) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do item"
        required
      />
      <button type="submit">Adicionar Item</button>
    </form>
  );
};

export default ItemForm;