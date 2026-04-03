import { useState, useEffect, useRef, useCallback } from 'react';

export function useInfiniteScroll(items, pageSize = 12) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const loaderRef = useRef(null);

  // Reset when items change (e.g., filter change)
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && visibleCount < items.length) {
        setVisibleCount((prev) => Math.min(prev + pageSize, items.length));
      }
    },
    [visibleCount, items.length, pageSize]
  );

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '200px',
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [handleObserver]);

  return {
    visibleItems: items.slice(0, visibleCount),
    hasMore: visibleCount < items.length,
    loaderRef,
  };
}
