import { useState } from "react"
import { useDispatch } from "react-redux"
import { fetchProducts } from "../../../features/products/productSlice"
import { FaIcon } from "../../icon"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import {getFloor } from '../../../utility/getFloor'
import { fetchAPI } from "../../../utility/strapi"
import { Typography } from "../../typography"


export const Rate = ({
    id,
    rate,
    ratingCount
    
}) => {
    const dispatch = useDispatch()

    const [hover, setHover] = useState(null)

    let step = 1
    let yellowStarsCount = rate && getFloor(rate, step)

    const handleRating = async (id, value) => {

        console.log(id, value)

        // we calculate the new rate and ratingCount
        const newRatingCount = ratingCount + 1
        const newRate = (ratingCount * rate + value) / newRatingCount

        try {
            const response = await fetchAPI({
                path: `products/${id}`,
                options: {
                    method: 'put',
                    data: {
                      'data': {
                        ratingCount: newRatingCount,
                        rate: newRate,
                      }
                    }
                }
            })
           
            // we call the async thunk from redux to refresh the products list 
            dispatch(fetchProducts())
            
        } catch(err) {
            console.log('err', err)
            console.log('err', err?.response?.data?.error?.message)
        }
        

    }

  
    return (
        <div className="cursor-pointer">
            {[...Array(5)].map((_, index) => {
                let ratingValue = index + 1
               return (
                    <FaIcon 
                        key={index} 
                        icon={faStar} 
                        onClick={() => handleRating(id, ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        className={`text-xs ${ ratingValue <= (hover || yellowStarsCount) ? 'text-purple-500' : 'text-slate-500 ' }`} 
                    />
                )
            })}
        </div>
    )
}

export const RateCount = ({ratingCount}) => {

   
    return (
        <Typography variant='body3'>
            {ratingCount}
        </Typography>
    )

}

