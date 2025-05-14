import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getDJProfile = createAsyncThunk(
  'dj/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/djs/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener perfil');
    }
  }
);

export const createPost = createAsyncThunk(
  'dj/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear publicación');
    }
  }
);