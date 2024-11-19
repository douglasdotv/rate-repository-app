import { StyleSheet, View, ScrollView, Pressable } from 'react-native'
import { Link } from 'react-router-native'
import Constants from 'expo-constants'
import useCurrentUser from '../hooks/useCurrentUser'
import useSignOut from '../hooks/useSignOut'
import AppBarTab from './AppBarTab'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 8,
    paddingBottom: 4,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
  },
  scrollView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

const AppBar = () => {
  const { user } = useCurrentUser()
  const signOut = useSignOut()

  const isLoggedIn = !!user

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <Link to="/">
          <AppBarTab title="Repositories" />
        </Link>
        {isLoggedIn ? (
          <Pressable onPress={signOut}>
            <AppBarTab title="Sign out" />
          </Pressable>
        ) : (
          <Link to="/signin">
            <AppBarTab title="Sign in" />
          </Link>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
