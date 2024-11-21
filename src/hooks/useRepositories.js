import { useQuery } from '@apollo/client'
import { GET_REPOSITORIES } from '../graphql/queries'

const useRepositories = ({ orderBy, orderDirection }) => {
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: 'cache-and-network',
  })

  const repositories = data?.repositories

  return { loading, error, repositories }
}

export default useRepositories
