import { createSlice } from '@reduxjs/toolkit'


const copySlice = createSlice({
  name: 'copy',
  initialState : {
    data: 'test',
  } ,
  reducers: {
    // Give case reducers meaningful past-tense "event"-style names
    copy(state, action) {
      state.data = action.payload
      console.log(state)
    },
  }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { copy } = copySlice.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const copyAsync = (data) => (dispatch) => {
  setTimeout(() => {
    dispatch(copy(data))
  }, 1000)
}
// Export the slice reducer as the default export
export default copySlice.reducer