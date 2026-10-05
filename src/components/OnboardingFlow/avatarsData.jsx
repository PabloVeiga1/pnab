import React from 'react';

// Importação de todas as imagens da pasta AvatarIcons
import micImage from './AvatarIcons/microfone.png';
import cactusImage from './AvatarIcons/mandacaru.png';
import writerImage from './AvatarIcons/lampião.png';
import crabImage from './AvatarIcons/caran.png';
import owlImage from './AvatarIcons/coruja.png';
import jaguarImage from './AvatarIcons/gato.png';

export const AVATARS = [
  {
    id: 'mic',
    name: 'Microfone Retrô',
    description: 'Voz da cultura e comunicação alagoana',
    renderIcon: (color = '#A81D84', size = 56) => (
      <img 
        src={micImage} 
        alt="Microfone Retrô" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          borderRadius: '50%' 
        }} 
      />
    ),
  },
  {
    id: 'cactus',
    name: 'Mandacaru',
    description: 'Resiliência do sertão alagoano',
    renderIcon: (color = '#A81D84', size = 56) => (
      <img 
        src={cactusImage} 
        alt="Mandacaru" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          borderRadius: '50%' 
        }} 
      />
    ),
  },
  {
    id: 'writer',
    name: 'Estátua & Literatura',
    description: 'Literatura imortal de Graciliano e Lêdo Ivo',
    renderIcon: (color = '#A81D84', size = 56) => (
      <img 
        src={writerImage} 
        alt="Estátua & Literatura" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          borderRadius: '50%' 
        }} 
      />
    ),
  },
  {
    id: 'crab',
    name: 'Caranguejo',
    description: 'Tradição das lagoas e do sururu de Alagoas',
    renderIcon: (color = '#A81D84', size = 56) => (
      <img 
        src={crabImage} 
        alt="Caranguejo" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          borderRadius: '50%' 
        }} 
      />
    ),
  },
  {
    id: 'owl',
    name: 'Coruja da Sabedoria',
    description: 'Mente e ciência de Nise da Silveira e Aurélio',
    renderIcon: (color = '#A81D84', size = 56) => (
      <img 
        src={owlImage} 
        alt="Coruja da Sabedoria" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          borderRadius: '50%' 
        }} 
      />
    ),
  },
  {
    id: 'jaguar',
    name: 'Guerreiro & Onça',
    description: 'Força e liberdade de Zumbi dos Palmares',
    renderIcon: (color = '#A81D84', size = 56) => (
      <img 
        src={jaguarImage} 
        alt="Guerreiro & Onça" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          borderRadius: '50%' 
        }} 
      />
    ),
  },
]