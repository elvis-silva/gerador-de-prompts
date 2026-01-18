export const presets = [
  ['@babel/preset-env', { targets: { node: 'current' } }],
  ['@babel/preset-react', { runtime: 'automatic' }], // 'automatic' means you don't need to 'import React' in every file
  ['@babel/preset-typescript'],
];