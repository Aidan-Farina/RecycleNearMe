const typeDefs = `
type User {
  _id: ID
  username: String
  email: String
  password: String
}

type Location {
  _id: ID
  name: String
  latitude: Float
  longitude: Float
  description: String
}

type Auth {
  token: ID
  user: User
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  loginUser(email: String!, password: String!): Auth
  updateUser(username: String, email: String, password: String): User
  addLocation(
    name: String!
    latitude: Float!
    longitude: Float!
    description: String
  ): Location
}

type Query {
  getUser(id: ID!): User
  getAllUsers: [User]
  getUserByUsername(username: String!): User
  users: [User]
  getLocations(id: ID!): Location
  locations: [Location]
}
`;

module.exports = typeDefs;
