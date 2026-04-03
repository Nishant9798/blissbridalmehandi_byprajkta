import { useState } from 'react';

export default function BlurImage({ src, alt, className = '', ...props }) {
  const [loaded, setLoaded] = useState(false);

  // Generate a low-quality Cloudinary thumbnail for blur placeholder
  const getPlaceholder = (url) => {
    if (!url || !url.includes('cloudinary')) return null;
    return url.replace('/upload/', '/upload/w_40,q_10,e_blur:1000/');
  };

  const placeholder = getPlaceholder(src);

  return (
    <div className={`relative overflow-hidden ${className}`} {...props}>
      {placeholder && !loaded && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-up"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
