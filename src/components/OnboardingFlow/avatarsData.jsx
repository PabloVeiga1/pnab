import React from 'react';

// Importação de todas as imagens da pasta AvatarIcons
import micImage from './AvatarIcons/microfone.png';
import cactusImage from './AvatarIcons/mandacaru.png';
import writerImage from './AvatarIcons/lampião.png';
import crabImage from './AvatarIcons/caran.png';
import owlImage from './AvatarIcons/coruja.png';
import jaguarImage from './AvatarIcons/gato.png';

const buildAvatarIcon = (src, alt, size = 56, color = '#A81D84') => (
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
    renderIcon: (color = '#A81D84', size = 56) => buildAvatarIcon(micImage, 'Microfone Retrô', size, color),
  },
  {
    id: 'cactus',
    name: 'Mandacaru',
    description: 'Resiliência do sertão alagoano',
    renderIcon: (color = '#A81D84', size = 56) => buildAvatarIcon(cactusImage, 'Mandacaru', size, color),
  },
  {
    id: 'writer',
    name: 'Estátua & Literatura',
    description: 'Literatura imortal de Graciliano e Lêdo Ivo',
    renderIcon: (color = '#A81D84', size = 56) => buildAvatarIcon(writerImage, 'Estátua & Literatura', size, color),
  },
  {
    id: 'crab',
    name: 'Caranguejo',
    description: 'Tradição das lagoas e do sururu de Alagoas',
    renderIcon: (color = '#A81D84', size = 56) => buildAvatarIcon(crabImage, 'Caranguejo', size, color),
  },
  {
    id: 'owl',
    name: 'Coruja da Sabedoria',
    description: 'Mente e ciência de Nise da Silveira e Aurélio',
    renderIcon: (color = '#A81D84', size = 56) => buildAvatarIcon(owlImage, 'Coruja da Sabedoria', size, color),
  },
  {
    id: 'jaguar',
    name: 'Guerreiro & Onça',
    description: 'Força e liberdade de Zumbi dos Palmares',
    renderIcon: (color = '#A81D84', size = 56) => buildAvatarIcon(jaguarImage, 'Guerreiro & Onça', size, color),
  },
];