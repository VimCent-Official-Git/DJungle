const { User, Post } = require('../models');
const apiResponse = require('../utils/apiResponse');

const djController = {
  getDJProfile: async (req, res) => {
    try {
      const dj = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        include: [{
          model: Post,
          as: 'posts',
          where: { userId: req.params.id }
        }],
        where: { role: 'DJ' }
      });

      if (!dj) {
        return apiResponse.error(res, 404, 'DJ not found');
      }

      return apiResponse.success(res, dj, 'DJ profile retrieved successfully');
    } catch (error) {
      return apiResponse.error(res, 500, 'Failed to get DJ profile', error.message);
    }
  },

  updateDJProfile: async (req, res) => {
    try {
      const { bio, phone, location } = req.body;
      
      const dj = await User.findByPk(req.user.id);
      if (!dj || dj.role !== 'DJ') {
        return apiResponse.error(res, 403, 'Access denied');
      }

      await dj.update({
        bio: bio || dj.bio,
        phone: phone || dj.phone,
        location: location || dj.location
      });

      const djResponse = { ...dj.toJSON() };
      delete djResponse.password;

      return apiResponse.success(res, djResponse, 'DJ profile updated successfully');
    } catch (error) {
      return apiResponse.error(res, 500, 'Failed to update DJ profile', error.message);
    }
  },

  createPost: async (req, res) => {
    try {
      const { title, content, mediaType } = req.body;
      const mediaFiles = req.files?.map(file => file.path);

      const newPost = await Post.create({
        title,
        content,
        media: mediaFiles || [],
        mediaType,
        userId: req.user.id
      });

      return apiResponse.success(res, newPost, 'Post created successfully');
    } catch (error) {
      return apiResponse.error(res, 500, 'Failed to create post', error.message);
    }
  }
};

module.exports = djController;