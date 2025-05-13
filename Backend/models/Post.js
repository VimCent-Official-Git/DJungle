const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    media: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    mediaType: {
      type: DataTypes.ENUM('IMAGE', 'VIDEO', 'AUDIO'),
      allowNull: false
    }
  });

  return Post;
};