import Head from 'next/head'
import { selectChildrenProducts } from '../features/products/productSlice'
import {useSelector} from 'react-redux'
import { isEqual } from 'lodash'
import ProductsList from '../components/productsList'
import { PageWrapper } from '../components/wrapper'

export default function Women({}) {
  
  // isEqual : see cart page 
  const products = useSelector(selectChildrenProducts, isEqual)


  return (
    <>
      <Head>
        <title>children clothes</title>
      </Head>

      <ProductsList
          products={products}
      />

      
    </>
  )
}

