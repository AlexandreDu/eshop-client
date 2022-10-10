import Head from 'next/head'
import { useSelector } from 'react-redux'
import { selectCartProducts, selectTotalQuantity } from '../features/cart/cartSlice'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'
import { CartItem } from '../components/cart/cartItem'
import { CartTotal } from '../components/cart/cartTotal'
import { isEqual } from 'lodash'



export default function Cart({}) {

// we set isEqual lodash method to the useSelector equality function comparison in order to avoid multiple re render  
  const cartListWithDetails = useSelector(selectCartProducts, isEqual)
  const cartTotalQuantity = useSelector(selectTotalQuantity)
  
  const isSmOrUp = useMediaQuery({
    query: '(min-width: 640px)'
})
  
  return (
    <>
      <Head>
        <title>cart</title>
      </Head>
      <LayoutGroup>
        <motion.section layout className='w-full xl:w-2/3 mx-auto lg:p-4 lg:rounded-lg lg:bg-slate-200 '>
          <div className={`flex ${isSmOrUp ? 'flex-row' : 'flex-col'}`}>
            <div className='grow-[2] bg-white p-4 lg:rounded-sm'>
              <motion.h1 layout='position' className='font-semibold text-2xl text-purple-500'>My cart ({cartTotalQuantity} item{cartTotalQuantity > 1 ? 's' : ''})</motion.h1>
              {/* AnimatePresence works by detecting when direct children are removed from the React tree. */}
              <AnimatePresence>
                {cartListWithDetails.map(product => {
                  return (
                    <CartItem 
                      key={product?.id}
                      product={product}
                    />
                  )
                })}
              </AnimatePresence>
            </div>
            
            <CartTotal />

          </div>
        </motion.section>
      </LayoutGroup>
    </>
  )
}















