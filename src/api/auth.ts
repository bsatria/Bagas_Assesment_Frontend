import api from './axios';
import { LoginPayload, AuthResponse } from '../types/auth';

export const login = async (payload: LoginPayload) => {
  const response = await api.post<AuthResponse>('/dashboard-user/LoginDashboard', payload);
  return response.data;
};
