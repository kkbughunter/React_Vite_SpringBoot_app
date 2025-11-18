import React, { useState } from 'react';

export default function ItemForm({ product, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    stock: '1', 
    category: 'User Submitted',
    imagePath: ''
  });

  React.useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '1',
        category: product.category || 'User Submitted',
        imagePath: product.imagePath || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '1',
        category: 'User Submitted',
        imagePath: ''
      });
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      
      try {
        const response = await fetch('http://localhost:8080/api/upload/image', {
          method: 'POST',
          body: formDataUpload
        });
        
        if (response.ok) {
          const result = await response.json();
          setFormData({ ...formData, imagePath: result.url });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      overflow: 'auto'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
        margin: '20px'
      }}>
        <h2 style={{
          fontSize: '1.5em',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center',
          color: '#1f2937'
        }}>
{product ? '✏️ Edit Product' : '➕ Submit New Item to Catalog'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9em',
              fontWeight: '500',
              marginBottom: '8px',
              color: '#374151'
            }}>Item Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1em',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              required
              placeholder="Enter item name"
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9em',
              fontWeight: '500',
              marginBottom: '8px',
              color: '#374151'
            }}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1em',
                minHeight: '60px',
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              placeholder="Enter item description (optional)"
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9em',
                fontWeight: '500',
                marginBottom: '8px',
                color: '#374151'
              }}>Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1em',
                  outline: 'none'
                }}
                placeholder="0.00"
                required
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9em',
                fontWeight: '500',
                marginBottom: '8px',
                color: '#374151'
              }}>Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '1em',
                  outline: 'none'
                }}
                placeholder="1"
                required
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9em',
              fontWeight: '500',
              marginBottom: '8px',
              color: '#374151'
            }}>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1em',
                outline: 'none',
                background: 'white'
              }}
            >
              <option value="User Submitted">User Submitted</option>
              <option value="Electronics">Electronics</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.9em',
              fontWeight: '500',
              marginBottom: '8px',
              color: '#374151'
            }}>Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1em',
                outline: 'none'
              }}
            />
            {formData.imagePath && (
              <div style={{ marginTop: '10px' }}>
                <img 
                  src={`http://localhost:8080${formData.imagePath}`} 
                  alt="Preview" 
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}
                />
              </div>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '12px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1em',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
{product ? '✓ Update Product' : '➕ Submit to Catalog'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
                padding: '12px',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1em',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}