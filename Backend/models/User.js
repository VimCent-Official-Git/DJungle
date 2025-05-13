const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('DJ', 'CLIENT'),
      allowNull: false,
      defaultValue: 'CLIENT'
    },
    profileImage: {
      type: DataTypes.STRING,
      defaultValue: 'https://res.cloudinary.com/demo/image/upload/v1620000000/default-profile.png'
    },
    bio: {
      type: DataTypes.TEXT
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phone: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  User.prototype.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};