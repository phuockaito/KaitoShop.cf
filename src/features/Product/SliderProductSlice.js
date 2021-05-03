import { createSlice } from "@reduxjs/toolkit";
import { getProductSlider } from './pathAPI';

const SliderProductSlice = createSlice({
  name: 'productSlider',
  initialState: {
    listProductSlider: [],
    loading: true
  },
  reducers: {},
  extraReducers: {
    [getProductSlider.pending]: (state) => {
      state.loading = true;
    },
    [getProductSlider.rejected]: (state, action) => {
      state.loading = false;
    },
    [getProductSlider.fulfilled]: (state, action) => {
      state.loading = false;
      state.listProductSlider = action.payload.data;
    }
  }

});
const { reducer } = SliderProductSlice;
export default reducer;