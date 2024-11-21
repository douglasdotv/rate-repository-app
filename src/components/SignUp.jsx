import { StyleSheet, View, TextInput, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'
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
  username: '',
  password: '',
  passwordConfirmation: '',
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be between 5 and 30 characters')
    .max(30, 'Username must be between 5 and 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be between 5 and 50 characters')
    .max(50, 'Password must be between 5 and 50 characters'),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Password confirmation must match the password'
    )
    .required('Password confirmation is required'),
})

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const hasUsernameError =
    formik.touched.username && Boolean(formik.errors.username)
  const hasPasswordError =
    formik.touched.password && Boolean(formik.errors.password)
  const hasPasswordConfirmationError =
    formik.touched.passwordConfirmation &&
    Boolean(formik.errors.passwordConfirmation)

  return (
    <View>
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={[styles.input, hasUsernameError ? styles.inputError : null]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {hasUsernameError && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[styles.input, hasPasswordError ? styles.inputError : null]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />
      {hasPasswordError && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <Text style={styles.label}>Confirm password</Text>
      <TextInput
        style={[
          styles.input,
          hasPasswordConfirmationError ? styles.inputError : null,
        ]}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
        secureTextEntry
      />
      {hasPasswordConfirmationError && (
        <Text style={styles.errorText}>
          {formik.errors.passwordConfirmation}
        </Text>
      )}

      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
        disabled={formik.isSubmitting}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  )
}

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values
    await signUp({ username, password })
    await signIn({ username, password })
    navigate('/')
  }

  return (
    <View style={styles.container}>
      <SignUpForm onSubmit={onSubmit} />
    </View>
  )
}

export default SignUp
