import App from 'next/app'
import Head from 'next/head'
import { AnimatePresence } from "framer-motion"

import {Layout } from '../components/layout'

import storeWrapper from "../store"
import { fetchProducts } from '../features/products/productSlice';
import { fetchCategories } from '../features/categories/categorySlice';

import '../styles/globals.css'

// to prevent font awesome bugs on initial render
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

class MyApp extends App {

  static getInitialProps = storeWrapper.getInitialAppProps(store => async context => {

    await store.dispatch(fetchProducts())
    await store.dispatch(fetchCategories())
    

    return {
        pageProps: {
            ...(await App.getInitialProps(context)).pageProps,

        },
    };

  })
  render() {
    const {Component, pageProps, router} = this.props;
    
    const pathname = router?.state?.pathname || ''
    console.log('pathname', pathname)
    return (
      <>
        <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
        <Layout>
          {/* page transition */}
          <AnimatePresence
            exitBeforeEnter 
            initial={false}
          >
            <Component key={pathname} {...pageProps}/>
          </AnimatePresence>
        </Layout>
      </>
    )
  } 
}

export default storeWrapper.withRedux(MyApp)
