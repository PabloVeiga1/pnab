import React from 'react';

// Importação de todas as imagens da pasta AvatarIcons
import micImage from './IconesDeAvatar/microfone.png';
import cactusImage from './IconesDeAvatar/mandacaru.png';
import writerImage from './IconesDeAvatar/lampião.png';
import crabImage from './IconesDeAvatar/caran.png';
import owlImage from './IconesDeAvatar/coruja.png';
import jaguarImage from './IconesDeAvatar/gato.png';

const buildAvatarIcon = (src, alt) => (
  <img
    src={src}
    alt={alt}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      display: 'block',
      borderRadius: '50%',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      pointerEvents: 'none',
      objectPosition: 'center',
    }}
  />
);

export const AVATARS = [
  {
    id: 'mic',
    name: 'Microfone Retrô',
    description: 'Voz da cultura e comunicação alagoana',
    renderIcon: () => buildAvatarIcon(micImage, 'Microfone Retrô'),
  },
  {
    id: 'cactus',
    name: 'Mandacaru',
    description: 'Resiliência do sertão alagoano',
    renderIcon: () => buildAvatarIcon(cactusImage, 'Mandacaru'),
  },
  {
    id: 'writer',
    name: 'Estátua & Literatura',
    description: 'Literatura imortal de Graciliano e Lêdo Ivo',
    renderIcon: () => buildAvatarIcon(writerImage, 'Estátua & Literatura'),
  },
  {
    id: 'crab',
    name: 'Caranguejo',
    description: 'Tradição das lagoas e do sururu de Alagoas',
    renderIcon: () => buildAvatarIcon(crabImage, 'Caranguejo'),
  },
  {
    id: 'owl',
    name: 'Coruja da Sabedoria',
    description: 'Mente e ciência de Nise da Silveira e Aurélio',
    renderIcon: () => buildAvatarIcon(owlImage, 'Coruja da Sabedoria'),
  },
  {
    id: 'jaguar',
    name: 'Guerreiro & Onça',
    description: 'Força e liberdade de Zumbi dos Palmares',
    renderIcon: () => buildAvatarIcon(jaguarImage, 'Guerreiro & Onça'),
  },
];