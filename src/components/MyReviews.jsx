import { StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import useCurrentUser from '../hooks/useCurrentUser'
import ReviewItem from './ReviewItem'
import ItemSeparator from './ItemSeparator'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  error: {
    color: theme.colors.error,
  },
})

const MyReviews = () => {
  const { loading, error, user } = useCurrentUser({ includeReviews: true })

  if (loading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text style={styles.error}>{error.message}</Text>
  }

  const reviewNodes = user ? user.reviews.edges.map((edge) => edge.node) : []

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} isUserReview />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={<Text>You have not made any reviews yet.</Text>}
    />
  )
}

export default MyReviews
