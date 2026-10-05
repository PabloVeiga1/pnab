import React from 'react';

/**
 * Ilustração 1: O Caminho de Bronze (Splash & Onboarding 1)
 * Forma orgânica turquesa com caminho sinuoso, estrelas roxas, coqueiro e ondas da praia.
 */
export function PathIllustration({ size = 260, showPins = false }) {
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
        {/* Sombra suave para profundidade */}
        <filter id="blob-shadow" x="-10%" y="-10%" width="130%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#00c4b4" floodOpacity="0.25" />
        </filter>
        <linearGradient id="blob-grad" x1="20" y1="20" x2="240" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00dbca" />
          <stop offset="1" stopColor="#00b4a4" />
        </linearGradient>
      </defs>

      <path
        d="M135 24C185 18 228 52 236 102C244 153 216 198 174 226C131 254 75 250 42 214C8 178 14 121 44 79C73 37 94 30 135 24Z"
        fill="url(#blob-grad)"
        filter="url(#blob-shadow)"
      />

      <path
        d="M62 198C78 170 82 135 110 115C136 96 172 90 188 64"
        stroke="#FFFFFF"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g fill="#A81D84">
        <path d="M72 178L74 173L79 171L74 169L72 164L70 169L65 171L70 173L72 178Z" />
        <path d="M102 142L104 137L109 135L104 133L102 128L100 133L95 135L100 137L102 142Z" />
        <path d="M136 106L138 101L143 99L138 97L136 92L134 97L129 99L134 101L136 106Z" />
        <path d="M172 74L173.5 70L177.5 68.5L173.5 67L172 63L170.5 67L166.5 68.5L170.5 70L172 74Z" />
      </g>

      {showPins && (
        <g>
          {/* Pin 1 */}
          <g transform="translate(60, 186)">
            <circle cx="6" cy="6" r="8" fill="#A81D84" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="6" cy="6" r="3" fill="#FFFFFF" />
          </g>
          {/* Pin 2 */}
          <g transform="translate(98, 126)">
            <circle cx="6" cy="6" r="8" fill="#A81D84" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="6" cy="6" r="3" fill="#FFFFFF" />
          </g>
          {/* Pin 3 */}
          <g transform="translate(138, 90)">
            <circle cx="6" cy="6" r="8" fill="#A81D84" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="6" cy="6" r="3" fill="#FFFFFF" />
          </g>
          {/* Pin 4 */}
          <g transform="translate(180, 56)">
            <circle cx="6" cy="6" r="8" fill="#A81D84" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="6" cy="6" r="3" fill="#FFFFFF" />
          </g>
        </g>
      )}
      <g stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Tronco */}
        <path d="M175 204C173 180 176 160 185 146" />
        {/* Folhas */}
        <path d="M185 146C174 140 162 144 156 150" />
        <path d="M185 146C180 134 172 130 162 132" />
        <path d="M185 146C188 132 198 130 206 134" />
        <path d="M185 146C198 142 208 146 214 154" />
        <path d="M185 146C186 160 192 168 198 172" />
      </g>

      {/* Ondas do mar */}
      <g stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.9">
        <path d="M148 184C154 181 160 187 166 184" />
        <path d="M142 196C148 193 154 199 160 196" />
        <path d="M188 192C194 189 200 195 206 192" />
      </g>
    </svg>
  );
}

/**
 * Ilustração 3: Missões e Conquistas (Medalha Dourada com Estrela Roxa)
 */
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

      {/* Fitas da Medalha (Brancas penduradas) */}
      <path
        d="M104 20L114 96L128 88L142 96L152 20"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Círculo Externo Dourado da Medalha */}
      <circle cx="130" cy="142" r="50" fill="url(#medal-gold)" stroke="#FFFFFF" strokeWidth="6" />

      {/* Pespontos/Borda tracejada interna */}
      <circle
        cx="130"
        cy="142"
        r="42"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeDasharray="4 4"
        fill="none"
        opacity="0.8"
      />

      {/* Estrela Roxa / Magenta no centro */}
      <path
        d="M130 114L136.5 130.5L154 132L140.5 143.5L144.5 161L130 151.5L115.5 161L119.5 143.5L106 132L123.5 130.5L130 114Z"
        fill="#A81D84"
      />

      {/* Brilhos / Faíscas roxas ao redor da medalha */}
      <g fill="#A81D84">
        <path d="M72 88L73.5 83L78.5 81.5L73.5 80L72 75L70.5 80L65.5 81.5L70.5 83L72 88Z" />
        <path d="M195 92L196.5 87L201.5 85.5L196.5 84L195 79L193.5 84L188.5 85.5L193.5 87L195 92Z" />
        <path d="M198 178L199.5 174L203.5 172.5L199.5 171L198 167L196.5 171L192.5 172.5L196.5 174L198 178Z" />
      </g>
    </svg>
  );
}

/**
 * Logo Completo do Caminho de Bronze (com Ilustração + Tipografia)
 */
export function CaminhoDeBronzeLogo({ size = 220 }) {
  return (
    <div className="cb-logo-container">
      <PathIllustration size={size} showPins={false} />
      <div className="cb-logo-text">
        <div className="cb-logo-title-row">
          <span className="cb-logo-c">C</span>
          <span className="cb-logo-aminho">AMINHO</span>
        </div>
        <div className="cb-logo-subtitle">DE BRONZE</div>
      </div>
    </div>
  );
}

