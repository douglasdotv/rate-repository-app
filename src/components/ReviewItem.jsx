import { StyleSheet, View } from 'react-native'
import Text from './Text'
import theme from '../theme'
import format from 'date-fns/format'

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 32,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  contentContainer: {
    flexShrink: 1,
  },
  username: {
    fontWeight: theme.fontWeights.bold,
    marginBottom: 4,
  },
  createdAt: {
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  reviewText: {
    flexShrink: 1,
  },
})

const ReviewItem = ({ review, isUserReview = false }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy')

  const title = isUserReview ? review.repository.fullName : review.user.username

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.username}>{title}</Text>
          <Text style={styles.createdAt}>{formattedDate}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}

export default ReviewItem
