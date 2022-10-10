import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper"
import { fetchAPI } from '../../utility/strapi'

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {

        const {data: {data: categories}} = await fetchAPI({
            path: `categories`,
            urlParamsObject: {                 
                populate: '*',                      
                encodeValuesOnly: true, 
            },
            options: {
                method: 'get',
            }
        })


    return categories

    
    }
)



const initialState = {
  list: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },
    extraReducers:  {
       
        [fetchCategories.fulfilled]: (state, action) => {
      
        state.list = action.payload
        },
        [HYDRATE]: (state, action) => {
           
            return {
            ...state,
            ...action.payload?.categories,
            };
        },
        [fetchCategories.rejected]: (state, action) => {
            console.log('rejected action', action)
        },

    }
})

export const selectCategories = (state) => {
    return state.categories.list
  }





export default categoriesSlice.reducer

