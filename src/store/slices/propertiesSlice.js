import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      id: 1,
      listedBy: 'Mr David Beckham',
      address: '52 Mt Pleasant Street, QLD 4433',
      status: 'New',
      count: 3,
    },
  ],
  currentPage: 1,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = propertiesSlice.actions;
export default propertiesSlice.reducer;
