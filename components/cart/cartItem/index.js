import { useDispatch } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeProduct } from '../../../features/cart/cartSlice'
import { motion, usePresence } from 'framer-motion'
import { ResponsiveImage } from '../../../components/image'
import { getStrapiURL } from '../../../utility/strapi'
import { FaIcon } from '../../icon'
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons"


export const CartItem = ({product}) => {
    
    const dispatch = useDispatch()

    const [isPresent, safeToRemove] = usePresence()

    
    const handleIncrease = (id) => {
        let payload = {id}
        dispatch(increaseQuantity(payload))
    }

    const handleDecrease = (id) => {
        let payload = {id}
        dispatch(decreaseQuantity(payload))
    }

    const handleRemove = (id) => {
        let payload = {id}
        dispatch(removeProduct(payload))
    }

    const src = product?.attributes?.image?.data?.attributes?.url
    const quantity = product?.quantity
    const totalProductPrice = `${(product?.attributes?.price * quantity).toFixed(2)}€`
    
    return (
        // thanks to AnimatePresence, the component is not removed from the dom directly :  exit props is called and then onAnimationComplete where we call safeToRemove to remove the item from the dom
        <motion.div 
            layout
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onAnimationComplete={() => {
                !isPresent && safeToRemove()
            }}
            className='flex flex-wrap items-center justify-between border-b-2 last:border-b-0 p-4'
        >
            <div className='w-1/4 shrink-0'>
                <ResponsiveImage 
                    src={src}
                    alt={product?.attributes?.title}
                />              
            </div>
            <div className='w-2/4'>
                <span>{product?.attributes?.title}</span>
                <div>
                    <span>Quantity : {product?.quantity}</span>
                    <FaIcon 
                        className='ml-2 cursor-pointer'
                        icon={faPlus}
                        onClick={() => handleIncrease(product?.id)}
                    />
                    <FaIcon 
                        className='ml-2 cursor-pointer'
                        icon={faMinus}
                        onClick={() => handleDecrease(product?.id)}
                    />
                </div>
                <div>Price : {totalProductPrice}</div>
            </div>
            <FaIcon 
                className='ml-2 cursor-pointer'
                icon={faTrash}
                onClick={() => handleRemove(product?.id)}
            />
        </motion.div>

    )

}