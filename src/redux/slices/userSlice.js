import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { blogApi } from '../blogApi';

const initialState = {
  user: {},
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      localStorage.setItem('user', action.payload.user);
    },
    clearUser(state) {
      state.user = {};
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        blogApi.endpoints.loginUser.matchFulfilled,
        blogApi.endpoints.registerUser.matchFulfilled,
        blogApi.endpoints.updateUser.matchFulfilled,
        blogApi.endpoints.getProfile.matchFulfilled
      ),
      (state, { payload }) => {
        state.user = payload.user;
        localStorage.setItem('token', payload.user.token);
      }
    );
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
