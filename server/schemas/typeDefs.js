const typeDefs = `
type User {
  _id: ID
  username: String
  email: String
  password: String
}

type Tag {
  _id: ID
  name: String
  description: String
}

type Location {
  _id: ID
  name: String
  latitude: Float
  longitude: Float
  description: String
  tags: [Tag]
}

type Auth {
  token: ID
  user: User
}

type Tag {
  _id: ID!
  name: String!
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  loginUser(email: String!, password: String!): Auth
  updateUser(username: String, email: String, password: String): User
  addTag(name: String!, description: String, icon: String): Tag
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
  getTags: [Tag]
}
`;

module.exports = typeDefs;
