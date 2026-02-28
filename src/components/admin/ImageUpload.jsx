import { useState, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { CATEGORIES } from '../../utils/constants';
import { HiCloudUpload, HiPhotograph } from 'react-icons/hi';
import toast from 'react-hot-toast';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !category) {
      toast.error('Please fill in title, category, and select an image');
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', 'gallery');

      const xhr = new XMLHttpRequest();
      const uploadUrl = await new Promise((resolve, reject) => {
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            setProgress(Math.round((event.loaded / event.total) * 100));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            const res = JSON.parse(xhr.responseText);
            resolve(res.secure_url);
          } else {
            reject(new Error('Upload failed'));
          }
        };

        xhr.onerror = () => reject(new Error('Upload failed'));
        xhr.send(formData);
      });

      // Save to Firestore
      await addDoc(collection(db, 'gallery'), {
        title,
        category,
        description,
        imageUrl: uploadUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast.success('Image uploaded successfully!');
      setFile(null);
      setPreview(null);
      setTitle('');
      setCategory('');
      setDescription('');
      setProgress(0);
    } catch (err) {
      console.error('Upload error:', err);
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const categories = CATEGORIES.filter((c) => c !== 'All');

  return (
    <form onSubmit={handleUpload} className="space-y-6">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragOver ? 'border-gold bg-gold/5' : 'border-gray-300 hover:border-gold/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files[0])}
          className="hidden"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-60 mx-auto rounded-lg" />
        ) : (
          <div className="py-4">
            <HiCloudUpload className="text-gray-400 mx-auto mb-3" size={48} />
            <p className="text-gray-500 font-medium">Drop an image here or click to browse</p>
            <p className="text-gray-400 text-sm mt-1">Max size: 5MB</p>
          </div>
        )}
      </div>

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="E.g. Royal Bridal Full Hand Design"
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the design (optional)"
          rows={3}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold text-sm"
        />
      </div>

      {/* Progress bar */}
      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="gradient-gold h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
          <p className="text-sm text-gray-500 mt-1 text-center">{progress}%</p>
        </div>
      )}

      <button
        type="submit"
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gold text-white font-medium hover:bg-gold-dark transition-colors disabled:opacity-50"
      >
        <HiPhotograph size={18} />
        {uploading ? `Uploading... ${progress}%` : 'Upload Image'}
      </button>
    </form>
  );
}
