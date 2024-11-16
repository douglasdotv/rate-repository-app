import { StyleSheet, View } from 'react-native'
import { Link } from 'react-router-native'
import Constants from 'expo-constants'
import AppBarTab from './AppBarTab'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 8,
    paddingBottom: 4,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <AppBarTab title="Repositories" />
      </Link>
      <Link to="/signin">
        <AppBarTab title="Sign in" />
      </Link>
    </View>
  )
}

export default AppBar
