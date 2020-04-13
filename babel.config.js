module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          ie: '9'
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
};
