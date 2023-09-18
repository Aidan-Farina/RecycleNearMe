const { User, Tag} = require('../models'); // Import your User model
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
    getTags: async () => {
      const tags = await Tag.find({});
      console.log("Tags from DB:", tags);
      return tags;
    },
    getLocations: async (parent, args) => {
      try {
        const { name, skip, limit, sortBy } = args;
    
        // Define a base query
        const query = {};
    
        // Apply filters based on arguments
        if (name) {
          query.name = { $regex: name, $options: 'i' };
        }
    
        // Create a MongoDB query and apply sorting, pagination
        const locationsQuery = Location.find(query);
    
        if (sortBy) {
          locationsQuery.sort(sortBy); // 'sortBy' can be an object like { createdAt: -1 } for descending order
        }
    
        if (skip) {
          locationsQuery.skip(skip);
        }
    
        if (limit) {
          locationsQuery.limit(limit);
        }
    
        const locations = await locationsQuery.exec();
    
        return locations;
      } catch (error) {
        throw new Error('Error fetching locations: ' + error);
      }
    },
    
  },
  Mutation: {
    // Create a new user
    createUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        
        if (!token) {
          console.error("Token not generated");
          return null;
        }
    
        return { token, user };
      } catch (error) {
        console.error("Error in createUser:", error);
        return null;
      }
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
    addTag: async (_, args) => {
      const tag = new Tag(args);
      await tag.save();
      return tag;
    },
    addLocation: async (_, args) => {
      const { tags, ...rest } = args;
      const location = new Location(rest);
      if (tags) {
        location.tags = tags;
      }
      await location.save();
      return location;
    },
  }
};

module.exports = resolvers;