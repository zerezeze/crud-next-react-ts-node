import { useState, useEffect } from 'react';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';

interface Item {
  id: number;
  name: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch('/api/items');
    const data = await res.json();
    setItems(data);
  };

  const addItem = async (name: string) => {
    const res = await fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    const newItem = await res.json();
    setItems([...items, newItem]);
  };

  const updateItem = async (id: number, name: string) => {
    await fetch('/api/items', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name }),
    });
    fetchItems();
  };

  const deleteItem = async (id: number) => {
    await fetch(`/api/items?id=${id}`, { method: 'DELETE' });
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <h1>Meu CRUD App</h1>
      <ItemForm onSubmit={addItem} />
      <ItemList items={items} onDelete={deleteItem} onUpdate={updateItem} />
    </div>
  );
}