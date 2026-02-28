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
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-poppins font-medium transition-all duration-300 text-sm md:text-base';

  const variants = {
    primary: 'bg-gold text-white hover:bg-gold-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    secondary: 'bg-maroon text-white hover:bg-maroon-dark shadow-lg hover:shadow-xl hover:-translate-y-0.5',
    outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-white',
    'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-maroon',
    ghost: 'text-gold hover:bg-gold/10',
  };

  const classes = `${base} ${variants[variant] || variants.primary} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  );
}
