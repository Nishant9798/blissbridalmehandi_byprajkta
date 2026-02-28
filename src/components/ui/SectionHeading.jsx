export default function SectionHeading({ subtitle, title, description, light = false }) {
  return (
    <div className="text-center mb-12">
      {subtitle && (
        <p className={`font-vibes text-2xl md:text-3xl mb-2 ${light ? 'text-gold-light' : 'text-gold'}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`font-playfair text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-maroon'}`}>
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl mx-auto text-base md:text-lg ${light ? 'text-cream/80' : 'text-gray-600'}`}>
          {description}
        </p>
      )}
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className={`h-[1px] w-12 ${light ? 'bg-gold-light' : 'bg-gold'}`} />
        <span className={`text-xl ${light ? 'text-gold-light' : 'text-gold'}`}>&#10043;</span>
        <span className={`h-[1px] w-12 ${light ? 'bg-gold-light' : 'bg-gold'}`} />
      </div>
    </div>
  );
}
