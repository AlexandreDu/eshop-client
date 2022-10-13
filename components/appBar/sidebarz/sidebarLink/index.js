import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { motion } from "framer-motion"

import { Typography } from "../../../typography"


export const SidebarLink = ({label, href, animate, initial, variants, isActive}) => {

    console.log('isActive', isActive)
    
    return (
      
        <Link href={href}>
            <motion.li 
                className='cursor-pointer'
                animate={animate}
                initial={initial}
                variants={variants}

            >
                <Typography component='span' color={`${isActive ? 'text-red-500' : 'text-white' }`} bold>{label}</Typography>
            </motion.li>
        </Link>   

    )
}