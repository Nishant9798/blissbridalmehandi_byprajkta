import { useState } from 'react';
import { doc, deleteDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { useFirestoreCollection } from '../../hooks/useFirestore';
import { CATEGORIES } from '../../utils/constants';
import { HiPencil, HiTrash, HiCheck, HiX } from 'react-icons/hi';
import LoadingSpinner from '../ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function ImageManager() {
  const { documents: images, loading } = useFirestoreCollection('gallery', {
    orderByField: 'createdAt',
    orderDirection: 'desc',
  });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = async (image) => {
    if (!window.confirm(`Delete "${image.title}"? This cannot be undone.`)) return;

    try {
      if (image.storagePath) {
        await deleteObject(ref(storage, image.storagePath));
      }
      await deleteDoc(doc(db, 'gallery', image.id));
      toast.success('Image deleted');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete image');
    }
  };

  const startEdit = (image) => {
    setEditingId(image.id);
    setEditData({ title: image.title, category: image.category, description: image.description || '' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async (id) => {
    if (!editData.title || !editData.category) {
      toast.error('Title and category are required');
      return;
    }
    try {
      await updateDoc(doc(db, 'gallery', id), {
        ...editData,
        updatedAt: serverTimestamp(),
      });
      toast.success('Image updated');
      cancelEdit();
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Failed to update image');
    }
  };

  const categories = CATEGORIES.filter((c) => c !== 'All');

  if (loading) return <LoadingSpinner size="lg" className="py-12" />;

  if (images.length === 0) {
    return <p className="text-gray-500 text-center py-12">No images uploaded yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <img
            src={image.imageUrl}
            alt={image.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-3">
            {editingId === image.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData((d) => ({ ...d, title: e.target.value }))}
                  className="w-full px-2 py-1.5 rounded border border-gray-200 text-sm focus:outline-none focus:border-gold"
                />
                <select
                  value={editData.category}
                  onChange={(e) => setEditData((d) => ({ ...d, category: e.target.value }))}
                  className="w-full px-2 py-1.5 rounded border border-gray-200 text-sm focus:outline-none focus:border-gold"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData((d) => ({ ...d, description: e.target.value }))}
                  rows={2}
                  className="w-full px-2 py-1.5 rounded border border-gray-200 text-sm focus:outline-none focus:border-gold"
                />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(image.id)} className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded text-xs hover:bg-green-600">
                    <HiCheck size={14} /> Save
                  </button>
                  <button onClick={cancelEdit} className="flex items-center gap-1 px-3 py-1.5 bg-gray-400 text-white rounded text-xs hover:bg-gray-500">
                    <HiX size={14} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h4 className="font-semibold text-sm text-maroon truncate">{image.title}</h4>
                <p className="text-xs text-gold">{image.category}</p>
                {image.description && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{image.description}</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => startEdit(image)} className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
                    <HiPencil size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(image)} className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                    <HiTrash size={14} /> Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
