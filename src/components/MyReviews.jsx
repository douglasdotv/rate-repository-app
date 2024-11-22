import {
  StyleSheet,
  ActivityIndicator,
  Alert,
  View,
  Pressable,
  FlatList,
} from 'react-native'
import { useNavigate } from 'react-router-native'
import useCurrentUser from '../hooks/useCurrentUser'
import useDeleteReview from '../hooks/useDeleteReview'
import ReviewItem from './ReviewItem'
import ItemSeparator from './ItemSeparator'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: 12,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontWeight: theme.fontWeights.bold,
  },
  error: {
    color: theme.colors.error,
  },
})

const MyReviews = () => {
  const navigate = useNavigate()
  const { loading, error, user } = useCurrentUser({
    includeReviews: true,
  })
  const [deleteReview, { loading: deleting, error: deleteError }] =
    useDeleteReview()

  if (loading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text style={styles.error}>{error.message}</Text>
  }

  if (deleteError) {
    Alert.alert('Error', 'Failed to delete review')
  }

  const reviewNodes = user ? user.reviews.edges.map((edge) => edge.node) : []

  const handleViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`)
  }

  const handleDeleteReview = async (reviewId) => {
    const confirmDelete = () => {
      deleteReview(reviewId)
    }

    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: confirmDelete },
      ],
      { cancelable: false }
    )
  }

  const renderItem = ({ item }) => (
    <View>
      <ReviewItem review={item} isUserReview />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => handleViewRepository(item.repository.id)}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeleteReview(item.id)}
          disabled={deleting}
        >
          <Text style={styles.buttonText}>
            {deleting ? 'Deleting...' : 'Delete review'}
          </Text>
        </Pressable>
      </View>
    </View>
  )

  return (
    <FlatList
      data={reviewNodes}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={<Text>You have not made any reviews yet.</Text>}
    />
  )
}

export default MyReviews
