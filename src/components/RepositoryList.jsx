import { StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import useRepositories from '../hooks/useRepositories'
import RepositoryItem from './RepositoryItem'
import ItemSeparator from './ItemSeparator'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  error: {
    color: theme.colors.error,
  },
})

export const RepositoryListContainer = ({ repositories }) => {
  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => <RepositoryItem repository={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

const RepositoryList = () => {
  const { loading, error, repositories } = useRepositories()

  if (loading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text style={styles.error}>{error.message}</Text>
  }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return <RepositoryListContainer repositories={repositoryNodes} />
}

export default RepositoryList
