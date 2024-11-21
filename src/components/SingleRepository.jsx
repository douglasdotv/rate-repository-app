import { View, StyleSheet, ActivityIndicator } from 'react-native'
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem'
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

  return (
    <View>
      <RepositoryItem repository={repository} showGitHubButton />
    </View>
  )
}

export default SingleRepository
