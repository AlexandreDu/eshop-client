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
               
                    
                        'email': email,
                        'password': password,
                        'username': username
                    
                }
            
            }
        })
        console.log('registered user', { userId, jwt, email: emailRegistered, username: usernameRegistered })
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
            console.log('rejected action', action)
            if(action?.error?.code === 'ERR_BAD_REQUEST') {
                state.error = 'Your email or password is wrong'
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
            console.log('rejected action', action)
            
            state.error = 'Something went wrong, please try again.'
        },
        [HYDRATE]: (state, action) => {
           
            return {
            ...state,
            ...action.payload?.auth,
            };
        },
        
    }
})



export default productsSlice.reducer

