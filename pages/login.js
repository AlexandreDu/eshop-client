import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'
import { useForm } from "react-hook-form"
import { Field } from '../components/form/field'
import { SubmitButton } from '../components/buttons'
import { Typography } from '../components/typography'
import { isEqual } from 'lodash'


export default function Login({}) {


    const router = useRouter() 

    const dispatch = useDispatch()    

    const { userId } = useSelector(state => state.auth, isEqual) 
    const cartProductsIdQuantity = useSelector((state) => state.cart.list, isEqual)

    const submitError = useSelector(state => state.auth.error)

    const {register, handleSubmit, formState:{ errors } } = useForm()

    const onSubmit = (data) => {

        const { email, password } = data
        
        let payload = {
            email,
            password
        }
        dispatch(login(payload))
    }

    useEffect(() => {
        // if the user is logged in, has a cart and tried to order, we push the cart path (and set the orderATtempt property to false)
        if(userId && cartProductsIdQuantity.length > 0 && router.query?.orderAttempt) {
            router.push({
                pathname: '/cart',
                query: {
                    prevPath: '/login',
                    orderAttempt: false
                }
            }, '/cart')
            return
        }
        
        // if the user is logged in and not coming from the cart page, we push the profile path
        if(userId && router.query?.prevPath !== '/cart') {
            router.push({ 
                pathname: '/profile',
                query: {prevPath: '/login'}
            }, '/profile')
            return
        }
    }, [userId])


    let requiredMessage = 'This field is required.'


    return (
        <>
            <Head>
                <title>login</title>
            </Head>
            <div className='lg:w-1/3 block mx-auto'>
                <Typography variant='h1'>Login</Typography>
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
                    
                        <p>Don&apos;t already have an account ? <Link href='/register'>Create one.</Link></p>
                    
                    
                    <p>{submitError}</p>
                    <SubmitButton
                        fullWidth
                    >
                        Login
                    </SubmitButton>
                </form>
            </div>
        </>
    )

}





