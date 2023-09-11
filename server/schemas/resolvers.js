const { User } = require('../models'); // Import your User model
const { signToken, createAuthenticationError } = require('../utils/auth'); // Import your signToken function and authentication error creator

const resolvers = {
  Query: {
    // Get a single user by ID or username
    getUser: async (_, { id, username }, context) => {
      const user = await User.findOne({
        $or: [{ _id: id }, { username: username }],
      });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
    getAllUsers: async () => {
      const users = await User.find({});
      return users;
    },
    getUserByUsername: async (_, { username }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },
  },
  Mutation: {
    // Create a new user
    createUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // Login and return a token
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Incorrect password');
      }
      const token = signToken(user);
      return { token, user };
    },
    // Update a user profile
    updateUser: async (_, { username, email, password }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { username, email, password },
          { new: true }
        );
        return updatedUser;
      }
      throw createAuthenticationError();
    },
  },
};

module.exports = resolvers;