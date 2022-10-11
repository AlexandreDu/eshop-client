import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/auth/authSlice'

import { useForm } from "react-hook-form"
import { Field } from '../components/form/field'
import fieldRules from '../data/fieldRules/index'
import { Errormessage } from '../components/form/errorMessage'

import { PageWrapper } from '../components/wrapper'
import { SubmitButton } from '../components/buttons'
import { Typography } from '../components/typography'



export default function Register({}) {

    const {email: emailRules, password: passwordRules, username: usernameRules} = fieldRules

    const dispatch = useDispatch()    


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



    return (
        <>
            <Head>
                <title>register</title>
            </Head>
            <PageWrapper> 
                <div className='lg:w-1/2 block mx-auto'>
                    <Typography variant='h1'>Register</Typography>
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
                        <Field 
                            label='Username'
                            register={register}
                            name='username'
                            rules={usernameRules}
                            type='text'
                            errorMessage={errors.username?.message}
                        />
                        {submitError && <Errormessage errorMessage={submitError}/>}
                        <SubmitButton
                            fullWidth
                        >
                            Register
                        </SubmitButton>
                    </form>
                </div>
            </PageWrapper>
        </>
    )

}





