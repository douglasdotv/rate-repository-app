import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER } from '../graphql/queries'

const useCurrentUser = () => {
  const { data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
  })

  const user = data?.me

  return { user }
}

export default useCurrentUser
