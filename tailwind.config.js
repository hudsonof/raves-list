module.exports = {
  mode: 'jit',
  content: [
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx'
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["forest", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "light", "dark"],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("daisyui")
  ],
}
