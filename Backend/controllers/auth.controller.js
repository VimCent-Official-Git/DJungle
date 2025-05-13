const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const apiResponse = require('../utils/apiResponse');
require('dotenv').config();

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, role } = req.body;
      
      // Validar que el rol sea válido
      if (!['DJ', 'CLIENT'].includes(role)) {
        return apiResponse.error(res, 400, 'Invalid role');
      }

      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return apiResponse.error(res, 400, 'Email already in use');
      }

      // Crear usuario
      const user = await User.create({
        name,
        email,
        password,
        role
      });

      // Generar token JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Preparar respuesta
      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      };

      return apiResponse.success(res, { user: userResponse, token }, 'User registered successfully');
    } catch (error) {
      return apiResponse.error(res, 500, 'Registration failed', error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Buscar usuario
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return apiResponse.error(res, 401, 'Invalid credentials');
      }

      // Verificar contraseña
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return apiResponse.error(res, 401, 'Invalid credentials');
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Preparar respuesta
      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      };

      return apiResponse.success(res, { user: userResponse, token }, 'Login successful');
    } catch (error) {
      return apiResponse.error(res, 500, 'Login failed', error.message);
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });
      
      if (!user) {
        return apiResponse.error(res, 404, 'User not found');
      }

      return apiResponse.success(res, user, 'Profile retrieved successfully');
    } catch (error) {
      return apiResponse.error(res, 500, 'Failed to get profile', error.message);
    }
  }
};

module.exports = authController;