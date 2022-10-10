import Head from 'next/head'
import { selectWomenProducts } from '../features/products/productSlice'
import {useSelector} from 'react-redux'
import { isEqual } from 'lodash'
import ProductsList from '../components/productsList'
import { PageWrapper } from '../components/wrapper'

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