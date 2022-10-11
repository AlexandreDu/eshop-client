import { useEffect, useState } from 'react'
import { isEqual } from 'lodash'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

import { useSelector, useDispatch } from 'react-redux'
import { selectTotalPrice, emptyCart } from '../../../features/cart/cartSlice'

import { Button } from '../../buttons'
import { Modal } from '../../modal'
import { Typography } from '../../typography'

import { FaIcon } from '../../icon'
import { faCheck } from "@fortawesome/free-solid-svg-icons"

import { fetchAPI } from '../../../utility/strapi'


export const CartTotal = ({}) => {
    const dispatch = useDispatch()
    
    const cartTotalPrice = useSelector(selectTotalPrice)
    const cartProductsIdQuantity = useSelector((state) => state.cart.list, isEqual)
    const isCartEmpty = cartProductsIdQuantity.length === 0
    const router = useRouter()

    const {jwt, userId }  = useSelector(state => state.auth, isEqual)

    const [isModalVisible, setIsModalVisible] = useState(false)

    const [submitError, setSubmitError] = useState(null)
    
    const handleOrder = async () => {

        if (!userId) {
            router.push({
                pathname: '/login',
                query: {orderAttempt: true}
            }, '/login')

            return
        }
        if (userId && !isCartEmpty) {
            try {
                const {data: {id}, statusText} = await fetchAPI({
                    path: `orders`,
                    options: {
                        method: 'post',
                        data: {
                          'data': {
                            cartProductsIdQuantity,
                            'customer_id': userId,
                            total: cartTotalPrice
                          }
                        }
                    },
                    bearer: jwt
                })
                setSubmitError(null)
                console.log('statusText', statusText)
                if (statusText) {
                    console.log('setIsModalVisible(true)')
                    setIsModalVisible(true)
                    
                }

            } catch(err) {
                setSubmitError(err)
            }
            
        }
    }

    useEffect(() => {
        let timer
        if(isModalVisible) {
            timer = setTimeout(() => {
            setIsModalVisible(false)
            router.push({
                pathname: '/'   
            })
            dispatch(emptyCart())
            }, 1500)
        }

        return () => clearTimeout(timer)

    }, [isModalVisible])



    
    return (
        <>
            <div className='sticky bottom-0 lg:static lg:block lg:grow lg:self-start lg:rounded-sm bg-white lg:ml-4 p-4'>
                <h1 className='font-semibold text-2xl inline'>Total : </h1>
                <span>{cartTotalPrice} €</span>
                <Button 
                    fullWidth 
                    onClick={handleOrder}
                    disabled={isCartEmpty}
                >
                    Order
                </Button>
                {submitError && submitError}
            </div>
            <AnimatePresence>
                {isModalVisible && (
                    <Modal
                        setIsVisible={setIsModalVisible}
                    >
                        <div className="flex justify-center items-center">
                            <FaIcon 
                                className={`mr-4 text-purple-500`}
                                icon={faCheck}
                            />
                            <Typography component={'span'}>Thanks for Your purchase !</Typography>
                        </div>

                    </Modal>
                )}
            </AnimatePresence>
        </>
    )

}