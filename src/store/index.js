import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from './slices/propertiesSlice';
import sidebarReducer from './slices/sidebarSlice';
import leadsReducer from './slices/leadsSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    sidebar: sidebarReducer,
    leads: leadsReducer,
  },
});
