import { useState, useEffect } from 'react'
import { Rate } from './rate'
import { RateCount } from "./rate"
import { ProductTitle } from './productTitle'
import { Category } from "./category"
import { ResponsiveImage } from '../image'
import { ellipsis } from '../../utility/ellipsis'
import { FaIcon } from '../icon'
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { useMediaQuery } from 'react-responsive'
import { getStrapiURL } from '../../utility/strapi'


const ProductCard = ({
    title, 
    category,
    image, 
    price, 
    ratingCount, 
    rate, 
    id, 
    onClick
}) => {

    console.log('image path', image)
  

    return (
        <div 
            className='w-[49%] sm:w-[32.3%] xl:w-[24%] select-none relative mb-[1rem] mx-[0.5%] cursor-pointer'
        >
            <div 
                className=''
                onClick={() => onClick(id)}
            >
                <ResponsiveImage 
                    src={image}
                    alt={title}
                />
            </div>
            <div onClick={() => onClick(id)}>
                <ProductTitle
                    title={title}
                    isEllipsed={true}
                />
            </div>
            <Category name={category} />
            <div className='flex flex-wrap items-center'>
                <Rate 
                    id={id}
                    rate={rate} 
                    ratingCount={ratingCount}
                    // handleRating={handleRating}
                />
                <RateCount 
                    ratingCount={ratingCount}
                />
            </div>
            <div 
                onClick={() => onClick(id)}
            >
                {price}€ 
            </div>
        </div>
    )

}

const DetailedProductCard = ({
    title, 
    category, 
    description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ', 
    image, 
    price
}) => {

    const isSmOrUp = useMediaQuery({
        query: '(min-width: 640px)'
      })

    
    let titleLength = typeof description === 'string' && title.length
    let descriptionMaxLength = 60 - titleLength
    let descriptionLength = typeof description === 'string' && description.length
    let isMaxLengthReached
    if(typeof descriptionLength === 'number') isMaxLengthReached = descriptionLength >= descriptionMaxLength
    if(isSmOrUp) isMaxLengthReached = false
      
    useEffect(() => {

        setIsDescriptionEllipsed(isMaxLengthReached)
        

    }, [isMaxLengthReached])

    const [isDescriptionEllipsed, setIsDescriptionEllipsed] = useState(false)

    return (
        <div>
            <div className='w-full mx-auto'>
                <ResponsiveImage 
                    src={image}
                    alt={title}
                />
            </div>
           
            <ProductTitle title={title} />
            
            <Category name={category} />
            <span>{price}€ </span>
            <div className='mb-[0.25rem]'>
                <>
                    <span>
                        {/* if the description should not be ellipsed, we set the max equal to descriptionLength */}
                        {ellipsis(description, isDescriptionEllipsed ? descriptionMaxLength : descriptionLength)}
                    </span>
                    {isDescriptionEllipsed ? (
                        <FaIcon 
                            className='ml-2 cursor-pointer'
                            icon={faArrowDown}
                            onClick={() => setIsDescriptionEllipsed(false)}
                        />
                    ) : (
                            // if the description is not ellipsed and the description length is longer than the maximum
                            isMaxLengthReached && (
                                <FaIcon 
                                    className='ml-2 cursor-pointer'
                                    icon={faArrowUp}
                                    onClick={() => setIsDescriptionEllipsed(true)}
                                />
                            )
                    )} 
                    
                </>
            </div>
        </div>
    )
    
}


export {ProductCard, DetailedProductCard}