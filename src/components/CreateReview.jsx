import { StyleSheet, View, TextInput, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import useCreateReview from '../hooks/useCreateReview'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  label: {
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    padding: 12,
    fontSize: theme.fontSizes.body,
    marginBottom: 12,
    fontFamily: theme.fonts.main,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.bold,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 12,
  },
})

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
}

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string(),
})

const CreateReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const hasOwnerNameError =
    formik.touched.ownerName && Boolean(formik.errors.ownerName)
  const hasRepositoryNameError =
    formik.touched.repositoryName && Boolean(formik.errors.repositoryName)
  const hasRatingError = formik.touched.rating && Boolean(formik.errors.rating)
  const hasTextError = formik.touched.text && Boolean(formik.errors.text)

  return (
    <View>
      <Text style={styles.label}>Repository owner</Text>
      <TextInput
        style={[styles.input, hasOwnerNameError ? styles.inputError : null]}
        placeholder="Repository owner's username"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {hasOwnerNameError && (
        <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
      )}

      <Text style={styles.label}>Repository name</Text>
      <TextInput
        style={[
          styles.input,
          hasRepositoryNameError ? styles.inputError : null,
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {hasRepositoryNameError && (
        <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
      )}

      <Text style={styles.label}>Rating (0-100)</Text>
      <TextInput
        style={[styles.input, hasRatingError ? styles.inputError : null]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        keyboardType="numeric"
      />
      {hasRatingError && (
        <Text style={styles.errorText}>{formik.errors.rating}</Text>
      )}

      <Text style={styles.label}>Review</Text>
      <TextInput
        style={[styles.input, hasTextError ? styles.inputError : null]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        multiline
      />
      {hasTextError && (
        <Text style={styles.errorText}>{formik.errors.text}</Text>
      )}

      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
        disabled={formik.isSubmitting}
      >
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  )
}

const CreateReview = () => {
  const navigate = useNavigate()
  const [createReview] = useCreateReview()

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values
    const { data } = await createReview({
      ownerName,
      repositoryName,
      rating: Number(rating),
      text,
    })
    if (data?.createReview?.repositoryId) {
      navigate(`/repository/${data.createReview.repositoryId}`)
    }
  }

  return (
    <View style={styles.container}>
      <CreateReviewForm onSubmit={onSubmit} />
    </View>
  )
}

export default CreateReview
