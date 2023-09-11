const typeDefs = `
type User {
  _id: ID
  username: String
  email: String
  password: String
}

type Auth {
  token: ID
  user: User
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  loginUser(email: String!, password: String!): Auth
  updateUser(username: String, email: String, password: String): User
}

type Query {
  getUser(id: ID!): User
  getAllUsers: [User]
  getUserByUsername(username: String!): User
  users: [User]
}
`;

module.exports = typeDefs;
