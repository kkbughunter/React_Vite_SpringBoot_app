import { useState } from 'react';

export default function ItemCard({ item, onEdit, onDelete, onPhotoUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    try {
      await onPhotoUpload(item.id, selectedFile);
      setSelectedFile(null);
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      transition: 'transform 0.2s, box-shadow 0.2s'
    }}>
      {item.photoPath && (
        <img
          src={item.photoPath}
          alt={item.name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '15px'
          }}
        />
      )}
      
      <h3 style={{ 
        fontSize: '1.3em', 
        fontWeight: 'bold', 
        margin: '0 0 10px 0',
        color: '#1f2937'
      }}>{item.name || 'Untitled Item'}</h3>
      
      <p style={{ 
        color: '#6b7280', 
        marginBottom: '15px',
        lineHeight: '1.5',
        minHeight: '40px'
      }}>{item.description || 'No description available'}</p>
      
      <div style={{ 
        fontSize: '0.85em', 
        color: '#9ca3af',
        marginBottom: '15px',
        padding: '8px',
        background: '#f9fafb',
        borderRadius: '4px'
      }}>
        <div>Created: {formatDate(item.createdAt)}</div>
        <div>Updated: {formatDate(item.updatedAt)}</div>
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '0.9em'
          }}
        />
        <button
          onClick={handlePhotoUpload}
          disabled={!selectedFile || uploading}
          style={{
            width: '100%',
            padding: '10px',
            background: (!selectedFile || uploading) ? '#9ca3af' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: (!selectedFile || uploading) ? 'not-allowed' : 'pointer',
            fontSize: '0.9em',
            fontWeight: 'bold'
          }}
        >
          {uploading ? '📤 Uploading...' : '📷 Upload Photo'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => onEdit(item)}
          style={{
            flex: 1,
            padding: '10px',
            background: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9em',
            fontWeight: 'bold'
          }}
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          style={{
            flex: 1,
            padding: '10px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9em',
            fontWeight: 'bold'
          }}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}