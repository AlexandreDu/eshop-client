import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectTotalPrice } from '../../../features/cart/cartSlice'
import { isEqual } from 'lodash'
import { Button } from '../../buttons'
import { Modal } from '../../modal'
import { fetchAPI } from '../../../utility/strapi'


export const CartTotal = ({}) => {
    
    const cartTotalPrice = useSelector(selectTotalPrice)
    const cartProductsIdQuantity = useSelector((state) => state.cart.list, isEqual)
    const isCartEmpty = cartProductsIdQuantity.length === 0
    const router = useRouter()

    const {jwt, userId }  = useSelector(state => state.auth, isEqual)

    const [isModalVisible, setIsModalVisible] = useState(false)
    
    const handleOrder = async () => {

        if(!userId) {
            router.push({
                pathname: '/login',
                query: {orderAttempt: true}
            }, '/login')

            return
        }
        if(userId && !isCartEmpty) {

            const {data, statusText} = await fetchAPI({
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
          
            if(statusText) setIsModalVisible(true)
            console.log('statusText',statusText)
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
            }, 1500)
        }

        return () => clearTimeout(timer)

    }, [isModalVisible])

    
    return (
        <>
            <motion.div layout={"position"} className='sticky bottom-0 lg:static lg:block lg:grow lg:self-start lg:rounded-sm bg-white lg:ml-4 p-4'>
                <h1 className='font-semibold text-2xl inline'>Total : </h1>
                <span>{cartTotalPrice} €</span>
                <Button 
                    fullWidth 
                    onClick={handleOrder}
                    disabled={isCartEmpty}
                >
                    Order
                </Button>
            </motion.div>
            <AnimatePresence>
                {isModalVisible && (
                    <Modal
                        setIsVisible={setIsModalVisible}
                    >
                        Thank you !
                    </Modal>
                )}
            </AnimatePresence>
        </>
    )

}