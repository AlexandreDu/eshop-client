import App from 'next/app';
import '../styles/globals.css'
import {Layout } from '../components/layout'
import Head from 'next/head'
// import { Provider } from "react-redux"
import storeWrapper from "../store"
import { fetchProducts } from '../features/products/productSlice';
import { fetchCategories } from '../features/categories/categorySlice';

class MyApp extends App {

  static getInitialProps = storeWrapper.getInitialAppProps(store => async context => {

    await store.dispatch(fetchProducts())
    await store.dispatch(fetchCategories())
    

    return {
        pageProps: {
            // https://nextjs.org/docs/advanced-features/custom-app#caveats
            ...(await App.getInitialProps(context)).pageProps,

        },
    };

  })
  render() {
    const {Component, pageProps} = this.props;

    return (
      <>
        <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  } 
}

export default storeWrapper.withRedux(MyApp)
