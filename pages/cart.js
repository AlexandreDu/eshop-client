import Head from 'next/head'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { isEqual } from 'lodash'

import storeWrapper from '../store'
import { useSelector } from 'react-redux'
import { fetchProducts } from '../features/products/productSlice'
import { fetchCategories } from '../features/categories/categorySlice'
import { selectCartProducts, selectTotalQuantity } from '../features/cart/cartSlice'


import { CartItem } from '../components/cart/cartItem'
import { CartTotal } from '../components/cart/cartTotal'
import { PageWrapper } from '../components/wrapper'


export default function Cart({}) {

// we set isEqual lodash method to the useSelector equality function comparison in order to avoid multiple re render  
  const cartListWithDetails = useSelector(selectCartProducts, isEqual)
  const cartTotalQuantity = useSelector(selectTotalQuantity)
  


  return (
    <>
      <Head>
        <title>cart</title>
      </Head>
      <PageWrapper>
        <LayoutGroup>
          <motion.section layout className='w-full  mx-auto lg:p-4 lg:rounded-lg lg:bg-slate-200 '>
            <div className={`flex flex-col sm:flex-row`}>
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
      </PageWrapper>
      
    </>
  )
}



export const getStaticProps = storeWrapper.getStaticProps( store => async ({preview}) => {
  await store.dispatch(fetchProducts())
  await store.dispatch(fetchCategories())
})













