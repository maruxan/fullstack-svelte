module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        light: {
          100: '#fbfbfb',
          200: '#f7f7f7',
          300: '#f2f2f2',
          400: '#eeeeee',
          500: '#eaeaea',
          600: '#bbbbbb',
          700: '#8c8c8c',
          800: '#5e5e5e',
          900: '#2f2f2f',
        },

        dark: {
          100: '#d6d6d6',
          200: '#adadad',
          300: '#858585',
          400: '#5c5c5c',
          500: '#333333',
          600: '#292929',
          700: '#1f1f1f',
          800: '#141414',
          900: '#0a0a0a',
        },

        accent: {
          100: '#ffd0e9',
          200: '#ffa1d4',
          300: '#ff72be',
          400: '#ff43a9',
          500: '#ff1493',
          600: '#cc1076',
          700: '#990c58',
          800: '#66083b',
          900: '#33041d',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
