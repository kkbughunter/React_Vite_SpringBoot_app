import { useState } from 'react';
import Layout from '../components/Layout';
import ItemCard from '../components/ItemCard';
import ItemForm from '../components/ItemForm';
import { useItems } from '../hooks/useItems';

export default function Items() {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    uploadPhoto
  } = useItems();

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await updateItem(editingItem.id, formData);
      } else {
        await createItem(formData);
      }
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem(id);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handlePhotoUpload = async (itemId, file) => {
    try {
      await uploadPhoto(itemId, file);
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Items</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading items...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {showForm && (
        <ItemForm
          item={editingItem}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPhotoUpload={handlePhotoUpload}
          />
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found. Create your first item!</p>
        </div>
      )}
      </div>
    </Layout>
  );
}