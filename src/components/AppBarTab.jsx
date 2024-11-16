import { StyleSheet, Pressable, Text } from 'react-native'
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

const AppBarTab = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default AppBarTab
