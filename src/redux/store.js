import { configureStore } from '@reduxjs/toolkit';

import { blogApi } from './blogApi';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
});
