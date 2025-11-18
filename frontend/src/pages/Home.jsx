import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      {/* Header */}
      <header style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', backdropFilter: 'blur(10px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: 'white', margin: 0, fontSize: '1.8em' }}>🏢 Office App</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login" style={{ background: 'white', color: '#667eea', padding: '10px 20px', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold' }}>
              Login
            </Link>
            <Link to="/register" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', padding: '10px 20px', borderRadius: '25px', textDecoration: 'none', fontWeight: 'bold', border: '2px solid white' }}>
              Register
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h2 style={{ color: 'white', fontSize: '3em', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Welcome to Your Digital Office
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.3em', marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px' }}>
          Manage products, organize items, and track your business with our modern DDD architecture
        </p>
        
        {/* Feature Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ background: 'white', padding: '40px 30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transform: 'translateY(0)', transition: 'transform 0.3s' }}>
            <div style={{ fontSize: '3em', marginBottom: '20px' }}>🛍️</div>
            <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '15px' }}>Product Catalog</h3>
            <p style={{ color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>Browse products, manage inventory, and handle shopping cart operations with ease</p>
            <Link to="/products" style={{ display: 'inline-block', padding: '12px 30px', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '25px', fontWeight: 'bold', transition: 'background 0.3s' }}>
              Explore Products →
            </Link>
          </div>
          
          <div style={{ background: 'white', padding: '40px 30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transform: 'translateY(0)', transition: 'transform 0.3s' }}>
            <div style={{ fontSize: '3em', marginBottom: '20px' }}>📦</div>
            <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '15px' }}>Item Manager</h3>
            <p style={{ color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>Organize your personal items with descriptions, photos, and categories</p>
            <Link to="/items" style={{ display: 'inline-block', padding: '12px 30px', background: '#2563eb', color: 'white', textDecoration: 'none', borderRadius: '25px', fontWeight: 'bold', transition: 'background 0.3s' }}>
              Manage Items →
            </Link>
          </div>
          
          <div style={{ background: 'white', padding: '40px 30px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', transform: 'translateY(0)', transition: 'transform 0.3s' }}>
            <div style={{ fontSize: '3em', marginBottom: '20px' }}>📊</div>
            <h3 style={{ color: '#333', fontSize: '1.5em', marginBottom: '15px' }}>Dashboard</h3>
            <p style={{ color: '#666', marginBottom: '25px', lineHeight: '1.6' }}>View your profile, statistics, and get an overview of your activities</p>
            <Link to="/dashboard" style={{ display: 'inline-block', padding: '12px 30px', background: '#7c3aed', color: 'white', textDecoration: 'none', borderRadius: '25px', fontWeight: 'bold', transition: 'background 0.3s' }}>
              Open Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;