import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-light pt-20">
      <div className="text-center px-4">
        <p className="font-vibes text-gold text-6xl mb-4">404</p>
        <h1 className="font-playfair text-3xl md:text-4xl font-bold text-maroon mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button to="/" variant="primary">Go Back Home</Button>
      </div>
    </div>
  );
}
