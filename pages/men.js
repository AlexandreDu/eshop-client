import Head from 'next/head'
import { isEqual } from 'lodash'

import storeWrapper from '../store'
import {useSelector} from 'react-redux'
import { fetchProducts } from '../features/products/productSlice'
import { fetchCategories } from '../features/categories/categorySlice'
import { selectMenProducts } from '../features/products/productSlice'

import ProductsList from '../components/productsList'
import { PageWrapper } from '../components/wrapper'
import { Typography } from '../components/typography'

export default function Men({}) {
  
  // isEqual : see cart page 
  const products = useSelector(selectMenProducts, isEqual)


  return (
    <>
      <Head>
        <title>men clothes</title>
      </Head>
      <PageWrapper>
        <ProductsList
            products={products}
            title={<Typography variant='h1'>{'Men’s fashion & accessories'.toUpperCase()}</Typography>}
        />
      </PageWrapper>
      
    </>
  )
}

export const getStaticProps = storeWrapper.getStaticProps( store => async ({preview}) => {
  await store.dispatch(fetchProducts())
  await store.dispatch(fetchCategories())
})


