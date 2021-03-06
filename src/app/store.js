import { configureStore } from "@reduxjs/toolkit";

import TrademarkTypeSlice from 'features/Product/TrademarkTypeSlice';
import listProductAPI from 'features/Product/ListProductSlice';
import SliderProductSlice from 'features/Product/SliderProductSlice';
import TypeProductSlice from 'features/Product/TypeProductSlice';
import ProductIdSlice from 'features/Product/ProductIdSlice';

import CommentSlice from 'features/Comment/CommentSlice';
import ListMenuSlice from 'features/Menu/ListMenuSlice';
import SearchProductSlice from 'features/Search/SearchProductSlice';
import CartSlice from 'features/Cart/CartSlice';
import UserSlice from 'features/User/UserSlice';

const rootReducer = {
    ListProduct: listProductAPI,
    menu: ListMenuSlice,
    slider: SliderProductSlice,
    type: TypeProductSlice,
    productId: ProductIdSlice,
    comment: CommentSlice,
    trademarkType: TrademarkTypeSlice,
    search: SearchProductSlice,
    cart: CartSlice,
    user: UserSlice
};
const store = configureStore({
    reducer: rootReducer
});
export default store;