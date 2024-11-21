import { gql } from '@apollo/client'

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      forksCount
      stargazersCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      url
    }
  }
`

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    me {
      id
      username
    }
  }
`
