import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../graphql/queries'

const useCurrentUser = (variables) => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables,
    fetchPolicy: 'cache-and-network',
  })

  const user = data?.me

  return { loading, error, user }
}

export default useCurrentUser
