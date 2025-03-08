import { configureStore, } from '@reduxjs/toolkit'

import copySliceReducer from '../features/CopySlice'

const store = configureStore({
  reducer: {
    copySliceReducer: copySliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: {
        warnAfter: 5000,
      },
    serializableCheck: false,
  }),
})

export default store;