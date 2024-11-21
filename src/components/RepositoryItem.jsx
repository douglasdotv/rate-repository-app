import { StyleSheet, View, Image, Pressable } from 'react-native'
import * as Linking from 'expo-linking'
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
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: theme.colors.appBarText,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
})

const formatCount = (count) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString()
}

const RepositoryItem = ({ repository, showGitHubButton = false }) => {
  const handleOpenInGitHub = () => {
    Linking.openURL(repository.url)
  }

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
      {showGitHubButton && (
        <Pressable style={styles.button} onPress={handleOpenInGitHub}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  )
}

export default RepositoryItem
