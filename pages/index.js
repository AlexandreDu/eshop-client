import Head from 'next/head'
import { isEqual } from 'lodash'

import storeWrapper from '../store'
import {useSelector} from 'react-redux'
import { fetchProducts } from '../features/products/productSlice'
import { fetchCategories } from '../features/categories/categorySlice'

import { PageWrapper } from '../components/wrapper'
import ProductsList from '../components/productsList'
import { Typography } from '../components/typography'

export default function Home() {
  


  const products = useSelector(state =>  state.products.list, isEqual)



  return (
    <>
      <Head>
        <title>all clothes</title>
      </Head>
      <PageWrapper>
        
        <ProductsList 
          products={products}
          title={<Typography variant='h1'>{'All the latest styles'.toUpperCase()}</Typography>}
        />
      </PageWrapper>
    </>
  )
}




export const getStaticProps = storeWrapper.getStaticProps( store => async ({preview}) => {
  await store.dispatch(fetchProducts())
  await store.dispatch(fetchCategories())
})
