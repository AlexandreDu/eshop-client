import NextLink from 'next/link'
import { motion, AnimatePresence, usePresence } from 'framer-motion'

import { useSelector } from 'react-redux'
import {selectProductsCount } from '../../features/cart/cartSlice'

import { FaIcon } from "../icon"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"



export const CartIcon = ({}) => {

    
    
    const productsCount = useSelector(selectProductsCount)

    const [isPresent, safeToRemove] = usePresence()


    return (

        <NextLink href='/cart'>
            <div 
                className="mr-4 relative cursor-pointer"
            >
                {productsCount > 0 && (
                    <AnimatePresence>
                        <motion.sup 
                            key={productsCount}
                            initial={{ opacity: 0, y: '-100%' }}
                            animate={{ opacity: 1, y: '0'}}
                            exit={{ opacity: 0, y: '100%' }}
                            onAnimationComplete={() => {
                                console.log('animation completedz')
                                !isPresent && safeToRemove()
                            }}
                            className="absolute -translate-y-1 -translate-x-3 z-10 bg-purple-800 text-white p-2 font-semibold rounded-full shadow-2xl shadow-white"
                        >
                        {productsCount}
                        </motion.sup>
                    </AnimatePresence>
                    
                )}

                <FaIcon className='text-xl' icon={faShoppingCart} />
            </div>
        </NextLink>
    )
}