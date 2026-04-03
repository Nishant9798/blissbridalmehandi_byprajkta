import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  to,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}) {
  const btnRef = useRef(null);

  const base = 'relative overflow-hidden inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-poppins font-medium transition-all duration-300 text-sm md:text-base';

  const variants = {
    primary: 'bg-gold text-white hover:bg-gold-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-maroon text-white hover:bg-maroon-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-white dark:text-gold-light dark:border-gold-light dark:hover:bg-gold dark:hover:text-white',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-maroon',
    ghost: 'text-gold hover:bg-gold/10 dark:text-gold-light',
  };

  const classes = `${base} ${variants[variant] || variants.primary} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  const createRipple = (e) => {
    const button = btnRef.current;
    if (!button || disabled) return;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-span';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  };

  const handleClick = (e) => {
    createRipple(e);
    onClick?.(e);
  };

  if (to) {
    return (
      <Link ref={btnRef} to={to} className={classes} onClick={createRipple} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button ref={btnRef} type={type} onClick={handleClick} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  );
}
