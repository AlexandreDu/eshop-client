import Head from 'next/head'
import { AnimatePresence } from "framer-motion"

import {Layout } from '../components/layout'

import { Provider } from 'react-redux'
import storeWrapper from "../store"

import '../styles/globals.css'

// to prevent font awesome bugs on initial render
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


      

const MyApp = ({Component, ...rest}) => {
  const {store, props, router} = storeWrapper.useWrappedStore(rest)
  const pathname = props.router?.state?.pathname || ''

  return (
      
    <Provider store={store}>
      <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
      <Layout>
        {/* page transition */}
        <AnimatePresence
          exitBeforeEnter 
          initial={false}
        >
          <Component key={pathname} {...props.pageProps}/>
        </AnimatePresence>
      </Layout>
    </Provider>
  )
}



export default MyApp
