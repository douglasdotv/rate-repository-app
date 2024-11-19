import { StyleSheet, View, TextInput, Pressable } from 'react-native'
import { useNavigate } from 'react-router-native'
import { useFormik } from 'formik'
import * as yup from 'yup'
import useSignIn from '../hooks/useSignIn'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.bgPrimary,
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
    marginBottom: 4,
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
}

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
})

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const hasUsernameError =
    formik.touched.username && Boolean(formik.errors.username)
  const hasPasswordError =
    formik.touched.password && Boolean(formik.errors.password)

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

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  )
}

const SignIn = () => {
  const navigate = useNavigate()
  const [signIn, result] = useSignIn()

  const onSubmit = async (values) => {
    const { username, password } = values
    const data = await signIn({ username, password })
    if (data?.authenticate?.accessToken) {
      navigate('/')
    }
  }

  return (
    <View style={styles.container}>
      <SignInForm onSubmit={onSubmit} />
      {result.error && (
        <Text style={styles.errorText}>{result.error.message}</Text>
      )}
      {result.loading && <Text>Please wait...</Text>}
    </View>
  )
}

export default SignIn
