// import user model
const { User } = require("../models");
// import sign token function from auth
const { signToken } = require("../utils/auth");

module.exports = {
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [
        { _id: user ? user._id : params.id },
        { username: params.username },
      ],
    });

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Cannot find a user with this id!" });
    }

    res.json({ data: { user: foundUser } });
  },

  async findOrCreateUser(email, authData, res) {
    let user = await User.findOne({ email });
  
    if (!user) {
      user = new User({
        ...authData,
        email,
      });
  
      try {
        await user.save();
      } catch (error) {
        return res.status(500).json({ message: "Error creating user." });
      }
    }
  
    return user;
  },
  
  async login({ body }, res) {
    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: "Wrong password!" });
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  async createPost({ user, body }, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $push: { userPosts: body } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async deletePost({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { userPosts: { postId: params.postId } } },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },
};
