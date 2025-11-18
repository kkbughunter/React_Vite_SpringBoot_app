import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import Navigation from '../components/Navigation';

const Products = () => {
  const { products, loading, error } = useProducts();
  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showCart, setShowCart] = useState(false);

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here');
    clearCart();
    setShowCart(false);
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Navigation />
      <div style={{ padding: '30px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2.5em', color: '#333', margin: 0 }}>🛍️ Products</h2>
          <button 
            onClick={() => setShowCart(!showCart)}
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
            🛒 Cart ({cartItems.length})
          </button>
        </div>

        {showCart && (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '25px', 
          marginTop: '30px' 
        }}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
        
        {products.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#666' }}>
            <div style={{ fontSize: '4em', marginBottom: '20px' }}>📦</div>
            <h3>No products available</h3>
            <p>Add some products to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;