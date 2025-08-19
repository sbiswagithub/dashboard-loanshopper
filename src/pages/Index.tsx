import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Auth } from './Auth';
import { Dashboard } from './Dashboard';

const Index = () => {
  const { user } = useAuth();

  return user ? <Dashboard /> : <Auth />;
};

export default Index;
