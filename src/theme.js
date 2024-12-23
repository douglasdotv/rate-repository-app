import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    bgPrimary: '#ffffff',
    bgSecondary: '#e1ecf4',
    primary: '#0366d6',
    appBarBackground: '#24292e',
    appBarText: '#ffffff',
    buttonText: '#ffffff',
    error: '#d73a4a',
  },
  fontSizes: {
    body: 12,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
}

export default theme
