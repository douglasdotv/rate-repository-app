import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Pressable,
} from 'react-native'
import { useNavigate } from 'react-router-native'
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

export const RepositoryListContainer = ({ repositories, onPressItem }) => {
  return (
    <FlatList
      data={repositories}
      renderItem={({ item }) => (
        <Pressable onPress={() => onPressItem(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

const RepositoryList = () => {
  const navigate = useNavigate()
  const { loading, error, repositories } = useRepositories()

  if (loading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text style={styles.error}>{error.message}</Text>
  }

  const handleItemPress = (id) => navigate(`/repository/${id}`)

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      onPressItem={handleItemPress}
    />
  )
}

export default RepositoryList
