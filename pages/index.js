import Head from 'next/head'
import { useRouter } from 'next/router'
import {useSelector} from 'react-redux'
import ProductsList from '../components/productsList'
import { PageWrapper } from '../components/wrapper'
import { isEqual } from 'lodash'
import { Typography } from '../components/typography'

export default function Home({}) {
  
  const router = useRouter()

  console.log('router', router)

  const products = useSelector(state =>  state.products.list, isEqual)



  return (
    <>
      <Head>
        <title>all products</title>
      </Head>
      <Typography variant='h1'>Discover all of products</Typography>
      <ProductsList 
        products={products}
      />
    </>
  )
}




