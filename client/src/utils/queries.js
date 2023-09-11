import { gql } from '@apollo/client';

export const QUERY_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      _id
      username
      email
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

