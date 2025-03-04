// logo.tsx
import React from 'react';
import logoPng from '../components/new-logo.png';

export default function Logo() {
  return <img src={logoPng} alt="Logo" style={{ width: '150px', height: 'auto' }} />;
}
