import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../features/orders/ordersSlice'
import { Pagination } from '../components/pagination'
import { usePagination } from '../hooks/usePagination'
import { Typography } from '../components/typography'
import { ResponsiveImage } from '../components/image'
import { getStrapiURL } from '../utility/strapi'

import { isEqual } from 'lodash'
import { format } from 'date-fns'


export default function Profile({}) {


    const router = useRouter() || {}

    const dispatch = useDispatch()    

    const {email, jwt, userId, userName } = useSelector(state => state.auth, isEqual) 
    const orders = useSelector((state) => state.orders.list, isEqual)


    const {currentPage, handleChangePage, pageSize, handleChangePageSize, rangeList: rangeOrdersList} = usePagination(orders)

    console.log('rangeOrdersList', rangeOrdersList)

    useEffect(() => {
    
        if(!jwt) {
            router.push({
                pathname: '/login',
                
            })
            return
        }
   

        dispatch(fetchOrders({jwt}))
        
        
    }, [userId])
    


 


    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            {/* tab list */}


            <Typography variant='h1'>My orders ({orders?.length ? orders.length : '0' })</Typography>
            <ul className='w-full lg:w-2/3'>
                {rangeOrdersList && rangeOrdersList.map( ({id, total, createdAt, order_items}) => {
                    let creationDate = format(new Date(createdAt), "MM/dd/yyyy")
                    return (
                        <>
                            <li className='flex justify-between bg-purple-500 rounded-sm my-2 p-2 text-white' key={id}>
                                <Typography component='span' variant='h2'># {id}</Typography>
                                <div>
                                    <Typography mr={2} component='span' variant='body2'>{total}€</Typography> 
                                    <span>|</span>
                                    <Typography ml={2} component='span' variant='body2'>{creationDate}</Typography>
                                </div>
                                
                            </li>
                           
                            {order_items.map( ({id, quantity, product: {title, price, image: {url}}}) => {

                                return (
                                    <>
                                        <li key={id}>{title}</li>
                                        <li>
                                            <ResponsiveImage 
                                                src={getStrapiURL(url)}
                                                alt={title}
                                            />
                                        </li>
                                    </>
                                )
                            })}
                        </>
                    )
                })}
            </ul>
            <Pagination 
                totalCount={orders?.length}
                pageSize={pageSize}
                currentPage={currentPage}
                handleChangePage={handleChangePage}
                handleChangePageSize={handleChangePageSize}
            />
        </>
    )

}





