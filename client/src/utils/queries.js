import { gql } from '@apollo/client';

export const QUERY_USER_BY_ID = gql`
query GetUser($getUserId: ID!) {
  getUser(id: $getUserId) {
    _id
    email
    password
    username
  }
}
`;

export const QUERY_USER_BY_USERNAME = gql`
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      _id
      username
      email
    }
  }
`;

export const QUERY_LOCATIONS = gql`
query GetLocations($name: String, $skip: Int, $limit: Int, $sortBy: LocationSortInput) {
  getLocations(name: $name, skip: $skip, limit: $limit, sortBy: $sortBy) {
    _id
    name
    latitude
    longitude
    description
  }
}
`

