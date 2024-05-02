/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ais: {
          black: '#1F1E1E',
          'blue-gray': '#E1E8ED',
          'light-blue': '#11BBFD',
          'dark-blue': '#4565B8',
          'light-gray': '#f5f5f5',
          'dark-gray': '#444444',
          'indigo': '#24314D',
          'hover-indigo': '#374b75',
          'blue': '#3E6EFF',
          white: '#FFFFFF',
          navy: '#202042',
          gray: '#B8B8B8',
          
        },
        'ais-new': {
          'darker-blue': '#293039',
          'dark-blue': '#361CFF',
          'med-blue': '#3E6EFF',
          'light-blue': '#88CAFF',
          orange: '#FFBC85',
          'soft-black': '#293039',
          black: '#1A2025',
          white: '#FFFFFF',
          beige: '#FFF8F3',
        },
        hai: {
          orange:'#FE6B52',
          'dark-blue':'#3E69B9',
          'light-blue':'#458EEC',
          navy:'#293039',
          gray:'#4F4F4F',
          beige:'#FFF9F5',
          cloud:'#DCE7ED',
          white: '#fafafa',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        cairo: ['Cairo', 'sans-serif'],
        hind: ['Hind Siliguri'],

        roboto: ['var(--roboto)'],
        'roboto-bold': ['var(--roboto-bold)'],
        placard: ['var(--placard)'],
        'placard-bold': ['var(--placard-bold)'],

        fredoka: ['var(--fredoka)'],
        primer: ['var(--primer)'],
        lucidity: ['var(--lucidity)'],
        campground: ['var(--campground)'],
        cooper: ['var(--cooper)'],
        rust: ['var(--rust)'],
      },
      scale: {
        85: '0.85',
        300: '3',
        400: '4',
      },
      screens: {
        xs:'430px',
        med: '832px',
      },
      backgroundSize: {
        fill:'100% 100%',
        'extra-fill':'150% 150%'
      },
      margin: {
        73: '18.75rem',
      },
      boxShadow: {
        large: 'var(--large)',
        medium: 'var(--medium)',
        small: 'var(--small)',
        xlarge: 'var(--xlarge)',
        xsmall: 'var(--xsmall)',
        xxlarge: 'var(--xxlarge)',
        xxsmall: 'var(--xxsmall)',
      },
      keyframes:{
        infinislide:{
          '0%': { transform: 'translateX(1000px)' },
          '100%': { transform: 'translateX(2000px)' },
        }
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
