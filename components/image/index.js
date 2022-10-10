import Image from 'next/image'

export const ResponsiveImage = ({src, title}) => {
  
    return (
        <Image 
            src={src}
            alt={title}
            width='80%'
            height='100%'
            layout="responsive"
        />
    )
}