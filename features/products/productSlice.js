import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper"
import { fetchAPI } from '../../utility/strapi'

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {

        const {data: {data: products} } = await fetchAPI({
            path: `products`,
            urlParamsObject: {                 
                populate: '*',                      
                encodeValuesOnly: true, // prettify URL
            },
            options: {
                method: 'get',
            }
        })
    return products
    }
)



const initialState = {
  list: [],
  error: null
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: {
       
        [fetchProducts.fulfilled]: (state, action) => {

        state.list = action.payload
        },
        [HYDRATE]: (state, action) => {
           
            return {
            ...state,
            ...action.payload?.products,
            };
        },
        [fetchProducts.rejected]: (state, action) => {
            console.log('rejected action', action)
            if(action.error?.message) {
                state.error = action.error.message
                return
            }
            state.error = 'Something went wrong, please try again.'
        }
    }
})



export const selectMenProducts = (state) => {
    return state.products.list.filter(({ attributes: {category:{data: {id}}}}) => {
       return id === 1
       
    })
}

export const selectWomenProducts = (state) => {
    return state.products.list.filter(({ attributes: {category:{data: {id}}}}) => {
       return id === 2
    })
}

export const selectChildrenProducts = (state) => {
    return state.products.list.filter(({ attributes: {category:{data: {id}}}}) => {
       return id === 3
    })
}



export default productsSlice.reducer