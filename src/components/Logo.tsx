import React from 'react';

interface LogoProps {
  className?: string;
}

/** Marci Metzger Homes wordmark — uses site fonts (Cinzel + Great Vibes). */
export const Logo: React.FC<LogoProps> = ({ className = 'h-8 sm:h-10 w-auto' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 180"
    className={className}
    role="img"
    aria-label="Marci Metzger Homes"
  >
    <text
      x="320"
      y="78"
      textAnchor="middle"
      fill="currentColor"
      style={{
        fontFamily: 'Cinzel, Georgia, serif',
        fontSize: 52,
        fontWeight: 500,
        letterSpacing: '0.22em',
      }}
    >
      MARCI METZGER
    </text>
    <line
      x1="48"
      y1="100"
      x2="592"
      y2="100"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <text
      x="320"
      y="148"
      textAnchor="middle"
      fill="currentColor"
      style={{
        fontFamily: '"Great Vibes", "Segoe Script", cursive',
        fontSize: 52,
        fontWeight: 400,
      }}
    >
      Homes
    </text>
  </svg>
);
