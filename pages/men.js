import Head from 'next/head'
import { selectMenProducts } from '../features/products/productSlice'
import {useSelector} from 'react-redux'
import { isEqual } from 'lodash'
import ProductsList from '../components/productsList'
import { PageWrapper } from '../components/wrapper'

export default function Men({}) {
  
  // isEqual : see cart page 
  const products = useSelector(selectMenProducts, isEqual)


  return (
    <>
      <Head>
        <title>men clothes</title>
      </Head>
      <ProductsList
          products={products}
      />
    </>
  )
}


