import Head from 'next/head'
import { isEqual } from 'lodash'

import {useSelector} from 'react-redux'
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