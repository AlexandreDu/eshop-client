import Head from 'next/head'
import { isEqual } from 'lodash'

import storeWrapper from '../store'
import {useSelector} from 'react-redux'
import { fetchProducts } from '../features/products/productSlice'
import { fetchCategories } from '../features/categories/categorySlice'
import { selectWomenProducts } from '../features/products/productSlice'

import { PageWrapper } from '../components/wrapper'
import ProductsList from '../components/productsList'


export default function Women({}) {
  
  // isEqual : see cart page 
  const products = useSelector(selectWomenProducts, isEqual)

  return (
    <>
      <Head>
        <title>women clothes</title>
      </Head>
      <PageWrapper>
        <ProductsList
            products={products}
        />
      </PageWrapper>
      

    </>
  )
}

export const getStaticProps = storeWrapper.getStaticProps( store => async ({preview}) => {
  await store.dispatch(fetchProducts())
  await store.dispatch(fetchCategories())
})