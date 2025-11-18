import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  console.log('Product data:', product); // Debug log
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer'
    }}>
      {product.imagePath && (
        <img 
          src={`http://localhost:8080${product.imagePath}`} 
          alt={product.name}
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
      }}>{product.name}</h3>
      
      <p style={{ 
        color: '#6b7280', 
        marginBottom: '15px',
        lineHeight: '1.5'
      }}>{product.description}</p>
      
      <div style={{ marginBottom: '15px' }}>
        <span style={{
          background: '#f3f4f6',
          color: '#374151',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.85em',
          fontWeight: '500'
        }}>
          {product.category}
        </span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ 
          fontSize: '1.5em', 
          fontWeight: 'bold', 
          color: '#059669'
        }}>${product.price}</span>
        
        <span style={{ 
          color: product.stock > 0 ? '#059669' : '#dc2626',
          fontSize: '0.9em',
          fontWeight: '500'
        }}>Stock: {product.stock}</span>
      </div>
      
      <button 
        onClick={() => onAddToCart(product)}
        disabled={product.stock === 0}
        style={{
          width: '100%',
          padding: '12px',
          background: product.stock === 0 ? '#9ca3af' : '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s'
        }}
      >
        {product.stock === 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;