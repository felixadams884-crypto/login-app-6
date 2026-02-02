import { useContext } from 'react';
import { AppAuthContext } from '../context/AppAuthContext';

export const useAppAuth = () => {
  return useContext(AppAuthContext);
};
