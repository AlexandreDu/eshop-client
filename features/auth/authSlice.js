import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { HYDRATE } from "next-redux-wrapper"
import { fetchAPI } from '../../utility/strapi'

export const login = createAsyncThunk(
    'auth/login',
    async (payload) => {
        const { email, password } = payload
      
        const {data: {jwt, user}} = await fetchAPI({
            path: `auth/local`,
            options: {
                method: 'post',
                data: {
                    identifier: email,
                    password: password,
                }
            }
        })
        return { user, jwt }
    }
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (payload) => {
        const { email, password, username } = payload
   
        const {data: {
            jwt, user: {
                id: userId,
                email: emailRegistered,
                username: usernameRegistered,

            }
        }} = await fetchAPI({
            path: `auth/local/register`,
            options: {
                method: 'post',
                data: {
                    email,
                    password,
                    username  
                }
            }
        })
        return { userId, jwt, email: emailRegistered, username: usernameRegistered }
    }
)


const initialState = {
    email: '',
    jwt: '',
    userId: '',
    username: '',
    error: ''
}

export const productsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: {
       
        [login.fulfilled]: (state, action) => {
           
            const {jwt, user} = action.payload
            // we empty the error since the user is successfully logged in
            state.error = ''
            state.email = user?.email
            state.jwt = jwt
            state.userId = user?.id,
            state.username = user?.username
        },
        [login.rejected]: (state, action) => {
      
            if(action.error.message) {
                state.error = action.error.message
                return
            }
            state.error = 'Something went wrong, please try again.'
        },
        [registerUser.fulfilled]: (state, action) => {
           
            const {jwt, email, userId, username} = action.payload
            // we empty the error since the user is successfully logged in
            state.error = ''
            state.email = email
            state.jwt = jwt
            state.userId = userId,
            state.username = username
        },
        [registerUser.rejected]: (state, action) => {
  
            if(action.error.message) {
                state.error = action.error.message
                return
            }
            state.error = 'Something went wrong, please try again.'
        },
        // the payload of the action contains the state at compile time, so the auth payload is empty. A solution would be to separate server and client state
        // [HYDRATE]: (state, action) => {
        
        //     return {
        //     ...state,
        //     ...action.payload?.auth,
        //     };
        // },
        
    }
})



export default productsSlice.reducer

