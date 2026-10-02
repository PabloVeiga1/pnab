import React from 'react';

/**
 * 6 Avatares Culturais Alagoanos
 */
export const AVATARS = [
  {
    id: 'mic',
    name: 'Microfone Retrô',
    description: 'Voz da cultura e comunicação alagoana',
    renderIcon: (color = '#A81D84', size = 56) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="6" width="16" height="22" rx="8" />
        <line x1="20" y1="12" x2="28" y2="12" strokeWidth="2.5" />
        <line x1="20" y1="17" x2="28" y2="17" strokeWidth="2.5" />
        <line x1="20" y1="22" x2="28" y2="22" strokeWidth="2.5" />
        <path d="M10 22C10 30 16 35 24 35C32 35 38 30 38 22" />
        <line x1="24" y1="35" x2="24" y2="42" />
        <line x1="16" y1="42" x2="32" y2="42" strokeWidth="3.5" />
      </svg>
    ),
  },
  {
    id: 'cactus',
    name: 'Mandacaru',
    description: 'Resiliência do sertão alagoano',
    renderIcon: (color = '#A81D84', size = 56) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6V42" strokeWidth="4" />
        <path d="M14 18V28C14 31 17 33 24 33" strokeWidth="3" />
        <path d="M34 14V24C34 27 31 29 24 29" strokeWidth="3" />
        <circle cx="24" cy="6" r="1.5" fill={color} />
        <line x1="12" y1="42" x2="36" y2="42" strokeWidth="3.5" />
      </svg>
    ),
  },
  {
    id: 'writer',
    name: 'Estátua & Literatura',
    description: 'Literatura imortal de Graciliano e Lêdo Ivo',
    renderIcon: (color = '#A81D84', size = 56) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 36C12 33 18 33 24 35C30 33 36 33 40 36V12C36 9 30 9 24 11C18 9 12 9 8 12V36Z" />
        <line x1="24" y1="11" x2="24" y2="35" strokeWidth="2.5" />
        <path d="M32 6C36 10 33 18 27 22L24 24" strokeWidth="2" strokeDasharray="1 1" />
      </svg>
    ),
  },
  {
    id: 'crab',
    name: 'Caranguejo',
    description: 'Tradição das lagoas e do sururu de Alagoas',
    renderIcon: (color = '#A81D84', size = 56) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="24" cy="26" rx="11" ry="8" />
        <circle cx="20" cy="17" r="2" fill={color} />
        <circle cx="28" cy="17" r="2" fill={color} />
        <line x1="20" y1="18" x2="20" y2="20" />
        <line x1="28" y1="18" x2="28" y2="20" />
        <path d="M14 24C10 20 8 16 11 13C14 10 16 15 15 18" />
        <path d="M34 24C38 20 40 16 37 13C34 10 32 15 33 18" />
        <path d="M14 28C10 31 9 37 12 40" />
        <path d="M34 28C38 31 39 37 36 40" />
      </svg>
    ),
  },
  {
    id: 'owl',
    name: 'Coruja da Sabedoria',
    description: 'Mente e ciência de Nise da Silveira e Aurélio',
    renderIcon: (color = '#A81D84', size = 56) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14C12 24 16 38 24 38C32 38 36 24 36 14C32 16 28 17 24 17C20 17 16 16 12 14Z" />
        <circle cx="19" cy="22" r="3.5" strokeWidth="2.5" />
        <circle cx="29" cy="22" r="3.5" strokeWidth="2.5" />
        <path d="M22 26L24 29L26 26" strokeWidth="2.5" />
        <line x1="16" y1="42" x2="32" y2="42" strokeWidth="3" />
      </svg>
    ),
  },
  {
    id: 'jaguar',
    name: 'Guerreiro & Onça',
    description: 'Força e liberdade de Zumbi dos Palmares',
    renderIcon: (color = '#A81D84', size = 56) => (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="14" />
        <path d="M12 14L10 8L16 10" />
        <path d="M36 14L38 8L32 10" />
        <circle cx="19" cy="21" r="1.5" fill={color} />
        <circle cx="29" cy="21" r="1.5" fill={color} />
        <path d="M22 26L24 28L26 26" strokeWidth="2" />
        <path d="M24 28V31" strokeWidth="2" />
        <line x1="13" y1="27" x2="9" y2="26" strokeWidth="2" />
        <line x1="35" y1="27" x2="39" y2="26" strokeWidth="2" />
      </svg>
    ),
  },
];
