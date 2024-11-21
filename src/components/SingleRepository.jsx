import { StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem'
import ReviewItem from './ReviewItem'
import ItemSeparator from './ItemSeparator'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  error: {
    color: theme.colors.error,
  },
})

const SingleRepository = () => {
  const { id } = useParams()
  const { loading, error, repository } = useRepository(id)

  if (loading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text style={styles.error}>{error.message}</Text>
  }

  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : []

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={
        <RepositoryItem repository={repository} showGitHubButton />
      }
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default SingleRepository
