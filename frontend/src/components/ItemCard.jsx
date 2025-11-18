import { useState } from 'react';
import { getImageUrl, validateFile } from '../utils/helpers';

export default function ItemCard({ item, onEdit, onDelete, onPhotoUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handlePhotoUpload = async () => {
    if (!selectedFile) return;
    
    const validation = validateFile(selectedFile);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }
    
    setUploading(true);
    try {
      await onPhotoUpload(item.id, selectedFile);
      setSelectedFile(null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition-shadow">
      {item.photoPath && (
        <img
          src={getImageUrl(item.photoPath)}
          alt={item.name}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      
      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
      <p className="text-gray-600 mb-4">{item.description}</p>
      
      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className="mb-2 text-sm"
        />
        <button
          onClick={handlePhotoUpload}
          disabled={!selectedFile || uploading}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:bg-gray-400 w-full"
        >
          {uploading ? 'Uploading...' : 'Upload Photo'}
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(item)}
          className="flex-1 bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="flex-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}