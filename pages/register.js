import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/auth/authSlice'
import { useForm } from "react-hook-form"
import { Field } from '../components/form/field'
import { SubmitButton } from '../components/buttons'
import { Typography } from '../components/typography'
import { isEqual } from 'lodash'

export default function Register({}) {


  

    const dispatch = useDispatch()    

    const { userId } = useSelector(state => state.auth, isEqual) 
    const cartProductsIdQuantity = useSelector((state) => state.cart.list, isEqual)

    const submitError = useSelector(state => state.auth.error)

    const {register, handleSubmit, formState:{ errors } } = useForm()

    const onSubmit = (data) => {

        const { email, password, username } = data
        
        let payload = {
            email,
            password,
            username
        }
        dispatch(registerUser(payload))
    }

   


    let requiredMessage = 'This field is required.'


    return (
        <>
            <Head>
                <title>register</title>
            </Head>
            <div className='lg:w-1/3 block mx-auto'>
                <Typography variant='h1'>Register</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Field 
                        label='Email'
                        placeholder='john.doe@app.com'
                        register={register}
                        name='email'
                        rules={{
                            required: requiredMessage, 
                            minLength: {
                            value: 4, 
                            message: 'This field must contain at least 4 characters'
                            },
                        }}
                        type='email'
                        errorMessage={errors.email?.message}
                    />
                    <Field 
                        label='Password'
                        register={register}
                        name='password'
                        rules={{
                            required: requiredMessage, 
                        }}
                        type='password'
                        errorMessage={errors.email?.message}
                    />
                    <Field 
                        label='Username'
                        register={register}
                        name='username'
                        rules={{
                            required: requiredMessage, 
                        }}
                        type='text'
                        errorMessage={errors.email?.message}
                    />
                    <p>{submitError}</p>
                    <SubmitButton
                        fullWidth
                    >
                        Register
                    </SubmitButton>
                </form>
            </div>
        </>
    )

}





