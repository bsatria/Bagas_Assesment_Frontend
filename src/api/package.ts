import api from './axios';
import { Package } from '../types/package';

export const getPackages = async () => {
  const response = await api.get<Package>('/BannerAds/Package/List');
  return response.data;
};

export const createPackage = async (payload: Omit<Package, 'id'>) => {
  const response = await api.post('/BannerAds/Package/Insert', payload);
  return response.data;
};

export const updatePackage = async (id: number, payload: Omit<Package, 'id'>) => {
  const response = await api.put(`/BannerAds/Package/Update/${id}`, payload);
  return response.data;
};

export const deletePackage = async (id: string) => {
  const response = await api.delete(`/BannerAds/Package/Delete/${id}`);
  return response.data;
};