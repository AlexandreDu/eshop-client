import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { isEqual } from 'lodash'
import { format } from 'date-fns'

import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../features/orders/ordersSlice'

import { PageWrapper } from '../components/wrapper'
import { Pagination } from '../components/pagination'
import { usePagination } from '../hooks/usePagination'
import { Typography } from '../components/typography'
import { ResponsiveImage } from '../components/image'


export default function Profile({}) {


    const router = useRouter() || {}

    const dispatch = useDispatch()    

    const { jwt, userId } = useSelector(state => state.auth, isEqual) 
    const orders = useSelector((state) => state.orders.list, isEqual)


    const {currentPage, handleChangePage, pageSize, handleChangePageSize, rangeList: rangeOrdersList} = usePagination(orders)



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
            <PageWrapper>
                <Typography variant='h1'>My orders ({orders?.length ? orders.length : '0' })</Typography>
                <ul className='w-full my-4'>
                    {rangeOrdersList && rangeOrdersList.map( ({id, total, createdAt, order_items}) => {
                        let creationDate = format(new Date(createdAt), "MM/dd/yyyy")
                        return (
                            <>
                                <li className='flex justify-between bg-purple-500 rounded-sm my-2 p-2 text-white' key={id}>
                                    <Typography component='span' variant='h2'># {id}</Typography>
                                    <div>
                                        <Typography component='span' variant='body2'>{total}€</Typography> 
                                        <span className='mx-4'>|</span>
                                        <Typography component='span' variant='body2'>{creationDate}</Typography>
                                    </div>
                                    
                                </li>
                            
                                <li className='lg:flex lg:flex-wrap lg:items-end lg:justify-between after:content-[""] after:flex-auto'> 
                                    {order_items.map( ({id, quantity, product: {title, price, image: {url}}}) => {

                                        return (
                                            <ul className='basis-[32.6%] lg:mr-[1%] last:mr-0' key={id}>
                                                <li><Typography variant={'h2'} component={'p'}>{title}</Typography></li>
                                                <li><Typography color={'text-purple-800'} variant={'h2'} component={'p'}>{price*quantity}€</Typography></li>
                                                <li className=''>
                                                    <ResponsiveImage 
                                                        src={url}
                                                        alt={title}
                                                    />
                                                </li>
                                            </ul>
                                        )
                                    })}
                                </li>
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
            </PageWrapper>
        </>
    )

}





