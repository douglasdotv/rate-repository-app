import { StyleSheet } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
})

const AppBarTab = ({ title }) => {
  return <Text style={styles.text}>{title}</Text>
}

export default AppBarTab
