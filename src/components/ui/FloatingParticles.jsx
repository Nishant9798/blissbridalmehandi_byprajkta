export default function FloatingParticles() {
  const particles = [
    { top: '10%', left: '5%', size: 6, delay: '0s', duration: '4s' },
    { top: '20%', left: '80%', size: 4, delay: '1s', duration: '5s' },
    { top: '40%', left: '15%', size: 8, delay: '2s', duration: '6s' },
    { top: '60%', left: '70%', size: 5, delay: '0.5s', duration: '4.5s' },
    { top: '75%', left: '30%', size: 4, delay: '1.5s', duration: '5.5s' },
    { top: '85%', left: '90%', size: 6, delay: '3s', duration: '4s' },
    { top: '30%', left: '50%', size: 3, delay: '2.5s', duration: '6s' },
    { top: '50%', left: '95%', size: 5, delay: '0.8s', duration: '5s' },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none animate-particle-rise"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: 'radial-gradient(circle, rgba(232, 197, 104, 0.6), transparent)',
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </>
  );
}
