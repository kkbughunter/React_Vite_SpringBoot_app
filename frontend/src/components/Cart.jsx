import React from 'react';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '12px',
        textAlign: 'center',
        color: '#6b7280',
        marginBottom: '30px',
        border: '2px dashed #d1d5db'
      }}>
        <div style={{ fontSize: '3em', marginBottom: '15px' }}>🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products to get started!</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '30px',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{ 
        margin: '0 0 20px 0', 
        color: '#1f2937', 
        fontSize: '1.4em',
        textAlign: 'center'
      }}>🛒 Shopping Cart</h3>
      
      {cartItems.map(item => (
        <div key={item.productId} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 0',
          borderBottom: '1px solid #f3f4f6'
        }}>
          <div style={{ flex: 1 }}>
            <strong style={{ color: '#1f2937' }}>{item.productName}</strong>
            <div style={{ color: '#6b7280', fontSize: '0.9em' }}>${item.price} each</div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            margin: '0 20px'
          }}>
            <button 
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid #d1d5db',
                background: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >-</button>
            <span style={{ 
              minWidth: '30px', 
              textAlign: 'center',
              fontWeight: 'bold'
            }}>{item.quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              style={{
                width: '30px',
                height: '30px',
                border: '1px solid #d1d5db',
                background: 'white',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >+</button>
          </div>
          
          <div style={{ minWidth: '80px', textAlign: 'right' }}>
            <strong style={{ color: '#059669' }}>${(item.price * item.quantity).toFixed(2)}</strong>
          </div>
          
          <button 
            onClick={() => onRemoveItem(item.productId)}
            style={{
              padding: '6px 12px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '15px',
              fontSize: '0.85em'
            }}
          >❌</button>
        </div>
      ))}
      
      <div style={{
        marginTop: '20px',
        padding: '20px 0',
        borderTop: '2px solid #e5e7eb',
        textAlign: 'right'
      }}>
        <div style={{ 
          fontSize: '1.3em', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '15px'
        }}>
          Total: <span style={{ color: '#059669' }}>${totalPrice.toFixed(2)}</span>
        </div>
        
        <button 
          onClick={onCheckout}
          style={{
            padding: '15px 40px',
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1.1em'
          }}
        >
          💳 Checkout Now
        </button>
      </div>
    </div>
  );
};

export default Cart;