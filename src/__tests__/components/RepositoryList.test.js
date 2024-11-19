import { render, screen, within } from '@testing-library/react-native'
import { RepositoryListContainer } from '../../components/RepositoryList'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('Should correctly render repository information', async () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React without the tears.',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'A flexible, promise-based data loader for React.',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      }

      render(<RepositoryListContainer repositories={repositories} />)

      const repositoryItems = screen.getAllByTestId('repositoryItem')
      expect(repositoryItems).toHaveLength(2)

      const firstRepository = within(repositoryItems[0])
      expect(firstRepository.getByText('jaredpalmer/formik')).toHaveTextContent(
        'jaredpalmer/formik'
      )
      expect(
        firstRepository.getByText('Build forms in React without the tears.')
      ).toHaveTextContent('Build forms in React without the tears.')
      expect(firstRepository.getByText('TypeScript')).toHaveTextContent(
        'TypeScript'
      )
      expect(firstRepository.getByText('21.9k')).toHaveTextContent('21.9k')
      expect(firstRepository.getByText('1.6k')).toHaveTextContent('1.6k')
      expect(firstRepository.getByText('3')).toHaveTextContent('3')
      expect(firstRepository.getByText('88')).toHaveTextContent('88')

      const secondRepository = within(repositoryItems[1])
      expect(
        secondRepository.getByText('async-library/react-async')
      ).toHaveTextContent('async-library/react-async')
      expect(
        secondRepository.getByText(
          'A flexible, promise-based data loader for React.'
        )
      ).toHaveTextContent('A flexible, promise-based data loader for React.')
      expect(secondRepository.getByText('JavaScript')).toHaveTextContent(
        'JavaScript'
      )
      expect(secondRepository.getByText('1.8k')).toHaveTextContent('1.8k')
      expect(secondRepository.getByText('69')).toHaveTextContent('69')
      expect(secondRepository.getByText('3')).toHaveTextContent('3')
      expect(secondRepository.getByText('72')).toHaveTextContent('72')
    })
  })
})
