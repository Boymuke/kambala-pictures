/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AVANT : brand-dark était Noir (#0a0a0a)
        // MAINTENANT : Il devient ton Marron
        "brand-dark": "#2a1a15", // Un marron profond et élégant pour le fond
        
        // AVANT : brand-brown était Marron
        // MAINTENANT : Il devient ton Noir ou un Anthracite très foncé
        "brand-brown": "#0a0a0a", // Le noir pour les accents, boutons et détails
      },
    },
  },
  plugins: [],
}