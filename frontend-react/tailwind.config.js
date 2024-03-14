//const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./components/images/background.jpg')",
      }
    },
    colors: {
      'GoodBridge_Green': '#38b188',
      'GoodBridge_Orange': '#f76500',
      'GoodBridge_Cream': '#F5EAE7',
      'GoodBridge_Purple': '#C5B7F4',
      'GoodBridge_GreenYellow': '#DAFAB0',
      'GoodBridge_LightBlue': '#BAE4F3',
      'DarkGreen': '#098253',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'red': '#ff0000',
      'white': '#ffffff',
      'black': '#000000',
      'offwhite': '#F8F7F4',
      'offwhite2': '#F0EFEB',
      'nearlywhite': '#FDFCF9',
      'lightgray': '#CECCC6',
      
    },    
    // fontFamily: {
    //   sans: ['"PT Sans"', 'sans-serif']
    // }
  },
  plugins: [],
}
