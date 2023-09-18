import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    token
    user {
      _id
    }
  }
}
`;

export const LOGOUT_MUTATION = gql`
  mutation logoutUser {
    logout {
      message
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_LOCATION = gql`
mutation AddLocation($name: String!, $latitude: Float!, $longitude: Float!, $tags: [ID]) {
  addLocation(name: $name, latitude: $latitude, longitude: $longitude, tags: $tags) {
    _id
  }
}
`;
