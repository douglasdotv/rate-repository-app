import { StyleSheet, View, Image } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.bgPrimary,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    marginRight: 16,
  },
  details: {
    flexShrink: 1,
  },
  language: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.bgSecondary,
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: theme.fontWeights.bold,
  },
})

const formatCount = (count) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString()
}

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.topSection}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.details}>
          <Text fontWeight="bold" fontSize="subheading">
            {repository.fullName}
          </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statNumber}>
            {formatCount(repository.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statNumber}>
            {formatCount(repository.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statNumber}>
            {formatCount(repository.reviewCount)}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text fontWeight="bold" style={styles.statNumber}>
            {formatCount(repository.ratingAverage)}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  )
}

export default RepositoryItem
