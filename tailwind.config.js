module.exports = {
  purge: [
    "./src/popup/**/*.{svelte,html,ts}",
    "./src/options/**/*.{svelte,html,ts}",
    "./src/components/**/*.{svelte,html,ts}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: "12px",
            },
          },
        },
      }),
      colors: {
        apple: {
          blue: "rgb(0,122,255)",
          green: "rgb(52,199,89)",
          orange: "rgb(255,149,0)",
          purple: "rgb(175,82,222)",
          red: "rgb(255,59,48)",
          yellow: "rgb(255,204,0)",
          gray: "rgb(142,142,147)",
          gray2: "rgb(174,174,178)",
          gray3: "rgb(199,199,204)",
          gray4: "rgb(209,209,214)",
          gray5: "rgb(229,229,234)",
          gray6: "rgb(242,242,247)",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
