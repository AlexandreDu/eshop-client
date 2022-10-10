import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper"
import { fetchAPI } from '../../utility/strapi'



export const fetchOrders = createAsyncThunk(
    'orders/user',
    async (payload) => {
        const { jwt } = payload
        const {data: {data}} = await fetchAPI({
            path: `orders`,
            options: {
                method: 'get',
            },
            urlParamsObject: {                 
                populate: '*',                      
                encodeValuesOnly: true, 
            },
            bearer: jwt
        })
        console.log('dataz', data)
        return data
    }
)



const initialState = {

    list: [],
    error: ''
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
    },
    extraReducers: {
       
        [fetchOrders.fulfilled]: (state, action) => {
            
            state.list = action.payload

        },
        [HYDRATE]: (state, action) => {
           
            return {
                ...state,
                ...action.payload?.orders,
            };
        },
        [fetchOrders.rejected]: (state, action) => {
            console.log('rejected action', action)
            state.error = 'Something went wrong, please try again.'
        }
    }
})



export default ordersSlice.reducer

