import { useState, useCallback } from 'react';

const STORAGE_KEY = 'likedImages';

function getStored() {
  try {
    return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
  } catch {
    return new Set();
  }
}

export function useLikedImages() {
  const [liked, setLiked] = useState(getStored);

  const isLiked = useCallback((id) => liked.has(id), [liked]);

  const toggleLike = useCallback((id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  return { isLiked, toggleLike, likedCount: liked.size };
}
