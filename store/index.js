import { configureStore } from '@reduxjs/toolkit'
import cartSliceReducer from '../features/cart/cartSlice'
import productSliceReducer from '../features/products/productSlice'
import categorySliceReducer from '../features/categories/categorySlice'
import authSliceReducer from '../features/auth/authSlice'
import ordersSliceReducer from '../features/orders/ordersSlice'
import {createWrapper} from 'next-redux-wrapper'



const makeStore= () => configureStore({
   reducer: {
      cart: cartSliceReducer,
      products: productSliceReducer,
      categories: categorySliceReducer,
      auth: authSliceReducer,
      orders: ordersSliceReducer
   },
   devTools: process.env.NODE_ENV === 'development'
})



const storeWrapper = createWrapper(makeStore, {debug: true});
export default storeWrapper

