import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const getClientProfile = createAsyncThunk(
  'client/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/clients/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener perfil');
    }
  }
);

export const createEvent = createAsyncThunk(
  'client/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear evento');
    }
  }
);