import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native'
import { SignInForm } from '../../components/SignIn'

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('Should call onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn()

      render(<SignInForm onSubmit={onSubmit} />)

      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'douglas')
      fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password')
      fireEvent.press(screen.getByText('Sign in'))

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'douglas',
          password: 'password',
        })
      })
    })
  })
})
