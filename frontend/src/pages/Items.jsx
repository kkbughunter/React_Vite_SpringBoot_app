import { useState } from 'react';
import Navigation from '../components/Navigation';
import ItemForm from '../components/ItemForm';
import { useItems } from '../hooks/useItems';

export default function Items() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const {
    items,
    loading,
    error,
    createItem
  } = useItems();

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createItem(formData);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`http://localhost:8080/api/products/${productId}`, {
          method: 'DELETE'
        });
        window.location.reload();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const updateProduct = async (productId, formData) => {
    const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) throw new Error('Failed to update product');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navigation />
      <div style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{ fontSize: '2.5em', color: '#333', margin: 0 }}>📦 Submit Items to Catalog</h1>
            <p style={{ color: '#666', margin: '5px 0 0 0', fontSize: '1.1em' }}>Add items to the products catalog and track your submissions</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '12px 24px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            ➕ Submit New Item
          </button>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ 
              display: 'inline-block', 
              width: '40px', 
              height: '40px', 
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #2563eb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '20px'
            }}></div>
            <p style={{ color: '#6b7280', fontSize: '1.1em' }}>Loading items...</p>
          </div>
        )}

        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fca5a5',
            color: '#dc2626',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            ⚠️ Error: {error}
          </div>
        )}

      {showForm && (
        <ItemForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '1.8em', marginBottom: '20px', color: '#333' }}>🎆 Your Products in Catalog</h2>
          
          {items.length === 0 && !loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
              <div style={{ fontSize: '4em', marginBottom: '20px' }}>📦</div>
              <h3>No products submitted yet</h3>
              <p>Submit your first item to add it to the products catalog!</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '25px' 
            }}>
              {items.map((item) => (
                <div key={item.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e5e7eb',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}>                  
                  {item.product?.imagePath && (
                    <img 
                      src={`http://localhost:8080${item.product.imagePath}`} 
                      alt={item.product.name}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '15px',
                        border: '1px solid #e5e7eb'
                      }}
                    />
                  )}
                  
                  <h3 style={{ 
                    margin: '0 0 10px 0', 
                    color: '#1f2937', 
                    fontSize: '1.3em',
                    fontWeight: 'bold'
                  }}>
                    {item.product?.name || 'Product not found'}
                  </h3>
                  
                  <p style={{ 
                    margin: '0 0 15px 0', 
                    color: '#6b7280', 
                    fontSize: '0.95em',
                    lineHeight: '1.5'
                  }}>
                    {item.product?.description}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '15px'
                  }}>
                    <span style={{ 
                      fontSize: '1.4em', 
                      fontWeight: 'bold', 
                      color: '#059669' 
                    }}>
                      ${item.product?.price}
                    </span>
                    <span style={{ 
                      background: '#f3f4f6', 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '0.85em',
                      color: '#6b7280'
                    }}>
                      Stock: {item.product?.stock}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    paddingTop: '15px',
                    borderTop: '1px solid #f3f4f6',
                    fontSize: '0.85em',
                    color: '#6b7280',
                    marginBottom: '15px'
                  }}>
                    <span>🏷️ {item.product?.category}</span>
                    <span>
                      Added {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleEdit(item.product)}
                      style={{
                        flex: 1,
                        padding: '8px 16px',
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.9em',
                        cursor: 'pointer'
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.product?.id)}
                      style={{
                        flex: 1,
                        padding: '8px 16px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '0.9em',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}