import Head from 'next/head'
import { isEqual } from 'lodash'

import storeWrapper from '../store'
import {useSelector} from 'react-redux'
import { fetchProducts } from '../features/products/productSlice'
import { fetchCategories } from '../features/categories/categorySlice'

import { PageWrapper } from '../components/wrapper'
import ProductsList from '../components/productsList'
import { Typography } from '../components/typography'

export default function Home({}) {
  


  const products = useSelector(state =>  state.products.list, isEqual)



  return (
    <>
      <Head>
        <title>all products</title>
      </Head>
      <PageWrapper>
        <Typography variant='h1'>Discover all our products</Typography>
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
