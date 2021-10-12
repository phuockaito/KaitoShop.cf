import { createSlice } from '@reduxjs/toolkit';
import { getProductTrademarkType } from './pathAPI';

const TrademarkTypeSlice = createSlice({
  name: 'trademarkType',
  initialState: {
    data: [],
    length: 0,
    loading: true
  },
  reducers: {},
  extraReducers: {
    [getProductTrademarkType.pending]: (state) => {
      state.loading = true;
    },
    [getProductTrademarkType.rejected]: (state, action) => {
      state.loading = false;
    },
    [getProductTrademarkType.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.length = action.payload.length;
    }
  }
});
const { reducer } = TrademarkTypeSlice;
export default reducer;