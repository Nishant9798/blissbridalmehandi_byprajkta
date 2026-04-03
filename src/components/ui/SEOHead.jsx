import { Helmet } from 'react-helmet-async';

const DEFAULTS = {
  siteName: 'Bliss Bridal Mehandi by Prajkta',
  description: 'Expert bridal mehandi artist in Mumbai. Beautiful henna designs for weddings, engagements, parties & festivals. Book your appointment today!',
  url: 'https://blissbridalmehandi.netlify.app',
};

export default function SEOHead({
  title,
  description = DEFAULTS.description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
}) {
  const fullTitle = title || DEFAULTS.siteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={DEFAULTS.siteName} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Additional SEO */}
      <meta name="keywords" content="mehandi, mehndi, bridal mehandi, henna artist, Mumbai mehandi, wedding henna, Arabic mehandi, bridal henna Mumbai, Prajkta mehandi" />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
}
