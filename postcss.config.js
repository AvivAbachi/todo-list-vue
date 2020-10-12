module.exports = {
  plugins: {
    tailwindcss: {},
    'vue-cli-plugin-tailwind/purgecss': {
      whitelist: [],
      keyframes: true,
    },
    autoprefixer: {},
  },
};
