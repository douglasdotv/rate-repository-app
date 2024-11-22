import { useMutation } from '@apollo/client'
import { DELETE_REVIEW } from '../graphql/mutations'
import { GET_CURRENT_USER } from '../graphql/queries'

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    update: (cache, { data: { deleteReview } }, { variables }) => {
      if (deleteReview) {
        const { me } = cache.readQuery({
          query: GET_CURRENT_USER,
          variables: { includeReviews: true },
        })

        cache.writeQuery({
          query: GET_CURRENT_USER,
          variables: { includeReviews: true },
          data: {
            me: {
              ...me,
              reviews: {
                ...me.reviews,
                edges: me.reviews.edges.filter(
                  (edge) => edge.node.id !== variables.id
                ),
              },
            },
          },
        })
      }
    },
  })

  const deleteReview = async (id) => {
    await mutate({ variables: { id } })
  }

  return [deleteReview, result]
}

export default useDeleteReview
