module.exports = {
  purge: [],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    opacity: ({ after }) => after(['disabled']),
  },
  plugins: [],
};
