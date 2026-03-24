import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('entered');
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPathname.current) {
      // Start exit animation
      setTransitionStage('exiting');
      prevPathname.current = location.pathname;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (transitionStage === 'exiting') {
      const timeout = setTimeout(() => {
        // Swap content after exit animation completes
        setDisplayChildren(children);
        setTransitionStage('entering');
      }, 300);
      return () => clearTimeout(timeout);
    }

    if (transitionStage === 'entering') {
      // Small delay to ensure DOM update before enter animation
      const raf = requestAnimationFrame(() => {
        setTransitionStage('entered');
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [transitionStage, children]);

  // Also update children when they change without a route change (e.g. same route re-render)
  useEffect(() => {
    if (transitionStage === 'entered') {
      setDisplayChildren(children);
    }
  }, [children, transitionStage]);

  const className =
    transitionStage === 'exiting'
      ? 'page-exit'
      : transitionStage === 'entering'
      ? 'page-enter'
      : 'page-entered';

  return <div className={`page-transition ${className}`}>{displayChildren}</div>;
}
