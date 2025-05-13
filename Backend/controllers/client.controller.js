const { User, Event } = require('../models');
const apiResponse = require('../utils/apiResponse');

const clientController = {
  getClientProfile: async (req, res) => {
    try {
      const client = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        include: [{
          model: Event,
          as: 'events',
          where: { userId: req.params.id }
        }],
        where: { role: 'CLIENT' }
      });

      if (!client) {
        return apiResponse.error(res, 404, 'Client not found');
      }

      return apiResponse.success(res, client, 'Client profile retrieved successfully');
    } catch (error) {
      return apiResponse.error(res, 500, 'Failed to get client profile', error.message);
    }
  },

  createEvent: async (req, res) => {
    try {
      const { title, description, date, location, budget } = req.body;
      
      const newEvent = await Event.create({
        title,
        description,
        date,
        location,
        budget,
        userId: req.user.id,
        status: 'PENDING'
      });

      return apiResponse.success(res, newEvent, 'Event created successfully');
    } catch (error) {
      return apiResponse.error(res, 500, 'Failed to create event', error.message);
    }
  }
};

module.exports = clientController;