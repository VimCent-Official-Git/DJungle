const { Sequelize } = require('sequelize');
const db = require('../config/db');

const User = require('./User')(db);
const Post = require('./Post')(db);
const Event = require('./Event')(db);

// Establecer relaciones
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Event, { foreignKey: 'userId', as: 'events' });
Event.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  db,
  User,
  Post,
  Event
};