module.exports = {
  mode: 'jit',
  corePlugins: {
    preflight: false
  },
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {},
    fontSize: {},
    extend: {
      spacing: {},
      lineHeight: {}
    }
  },
  plugins: []
};
