import brandLogo from '../../../identidade_visual/Logo e elementos-20261006T110335Z-1-001/Logo e elementos/logo completa.svg';
import brandSymbol from '../../../identidade_visual/Logo e elementos-20261006T110335Z-1-001/Logo e elementos/logo sem tipografia.svg';

export function PathIllustration({ size = 260, showPins = false }) {
  return (
    <div className="brand-path-frame" style={{ width: size, height: size }} aria-hidden="true">
      <img className="onboarding-svg-illustration" src={brandSymbol} alt="" draggable="false" />
      {showPins && (
        <div className="brand-route-pins">
          <span className="brand-route-pin" style={{ left: '33%', top: '68%' }} />
          <span className="brand-route-pin" style={{ left: '43%', top: '51%' }} />
          <span className="brand-route-pin" style={{ left: '53%', top: '36%' }} />
          <span className="brand-route-pin" style={{ left: '65%', top: '23%' }} />
        </div>
      )}
    </div>
  );
}

export function MissionsIllustration({ size = 260 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="onboarding-svg-illustration"
    >
      <defs>
        <filter id="medal-shadow" x="-10%" y="-10%" width="130%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#00c4b4" floodOpacity="0.25" />
        </filter>
        <linearGradient id="blob-missions" x1="30" y1="20" x2="230" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00dbca" />
          <stop offset="1" stopColor="#00b4a4" />
        </linearGradient>
        <linearGradient id="medal-gold" x1="85" y1="90" x2="175" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      <path
        d="M130 25C180 20 220 55 228 105C236 155 210 200 168 226C126 252 70 248 38 212C6 176 12 120 42 78C72 36 90 29 130 25Z"
        fill="url(#blob-missions)"
        filter="url(#medal-shadow)"
      />
      <path
        d="M104 20L114 96L128 88L142 96L152 20"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="130" cy="142" r="50" fill="url(#medal-gold)" stroke="#FFFFFF" strokeWidth="6" />
      <circle cx="130" cy="142" r="42" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="4 4" fill="none" opacity="0.8" />
      <path
        d="M130 114L136.5 130.5L154 132L140.5 143.5L144.5 161L130 151.5L115.5 161L119.5 143.5L106 132L123.5 130.5L130 114Z"
        fill="#A81D84"
      />
      <g fill="#A81D84">
        <path d="M72 88L73.5 83L78.5 81.5L73.5 80L72 75L70.5 80L65.5 81.5L70.5 83L72 88Z" />
        <path d="M195 92L196.5 87L201.5 85.5L196.5 84L195 79L193.5 84L188.5 85.5L193.5 87L195 92Z" />
        <path d="M198 178L199.5 174L203.5 172.5L199.5 171L198 167L196.5 171L192.5 172.5L196.5 174L198 178Z" />
      </g>
    </svg>
  );
}

export function CaminhoDeBronzeLogo({ size = 220 }) {
  return (
    <div className="cb-logo-container">
      <img
        className="cb-logo-image"
        src={brandLogo}
        alt="Caminho de Bronze"
        style={{ width: size * 1.6 }}
        draggable="false"
      />
    </div>
  );
}