import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: '🏠 Home', color: '#667eea' },
    { path: '/products', label: '🛍️ Products', color: '#10b981' },
    { path: '/items', label: '📦 Items', color: '#2563eb' },
    { path: '/dashboard', label: '📊 Dashboard', color: '#7c3aed' }
  ];

  const authItems = isAuthenticated 
    ? [
        { label: `👤 ${currentUser?.username || 'User'}`, color: '#6b7280', disabled: true },
        { action: handleLogout, label: '🚪 Logout', color: '#ef4444' }
      ]
    : [
        { path: '/login', label: '🔐 Login', color: '#f59e0b' },
        { path: '/register', label: '➕ Register', color: '#8b5cf6' }
      ];

  return (
    <nav style={{ 
      background: 'white', 
      padding: '15px 20px', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '0'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          {navItems.map(item => (
            <button 
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                padding: '10px 20px',
                borderRadius: '25px',
                background: location.pathname === item.path ? item.color : 'transparent',
                color: location.pathname === item.path ? 'white' : item.color,
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s',
                border: `2px solid ${item.color}`
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {authItems.map((item, index) => (
            <button 
              key={index}
              onClick={item.action || (() => navigate(item.path))}
              disabled={item.disabled}
              style={{
                padding: '10px 20px',
                borderRadius: '25px',
                background: item.disabled ? 'transparent' : item.color,
                color: item.disabled ? item.color : 'white',
                fontWeight: 'bold',
                cursor: item.disabled ? 'default' : 'pointer',
                transition: 'all 0.3s',
                border: item.disabled ? `2px solid ${item.color}` : 'none'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;