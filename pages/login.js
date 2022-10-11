import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { useForm } from "react-hook-form"
import { Field } from '../components/form/field'
import { Errormessage } from '../components/form/errorMessage'
import fieldRules from '../data/fieldRules/index'

import { isEqual } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/auth/authSlice'

import { SubmitButton } from '../components/buttons'
import { Typography } from '../components/typography'
import { PageWrapper } from '../components/wrapper'


export default function Login({}) {

    const {email: emailRules, password: passwordRules} = fieldRules

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
        
        // if the user is logged in and not coming from the cart page, we push the / path
        if(userId && router.query?.prevPath !== '/cart') {
            router.push({ 
                pathname: '/',
                query: {prevPath: '/login'}
            }, '/')
            return
        }
    }, [userId])


    return (
        <>
            <Head>
                <title>login</title>
            </Head>
            <PageWrapper>
                <div className='lg:w-1/2 block mx-auto'>
                    <Typography variant='h1'>Login</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Field 
                            label='Email'
                            placeholder='john.doe@app.com'
                            register={register}
                            name='email'
                            rules={emailRules}
                            type='email'
                            errorMessage={errors.email?.message}
                        />
                        <Field 
                            label='Password'
                            register={register}
                            name='password'
                            rules={passwordRules}
                            type='password'
                            errorMessage={errors.password?.message}
                        />
                        
                        <p>Don&apos;t already have an account ? <Link href='/register'>
                            <span className='text-purple-800 underline cursor-pointer'>Create one.</span></Link>
                        </p>
                        
                        {submitError && <Errormessage errorMessage={submitError}/>}
                        <SubmitButton
                            fullWidth
                        >
                            Login
                        </SubmitButton>
                    </form>
                </div>
            </PageWrapper>
            
        </>
    )

}





