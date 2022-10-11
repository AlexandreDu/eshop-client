import React from "react";
import Link from "next/link";
import { motion } from "framer-motion"

import { Typography } from "../../../typography"


export const SidebarLink = ({label, href, animate, initial, variants}) => {



    return (
      
        <Link href={href}>
            <motion.li 
                className='cursor-pointer'
                animate={animate}
                initial={initial}
                variants={variants}
            >
                <Typography component='span' variant='h1' color='text-white'>{label}</Typography>
            </motion.li>
        </Link>   

    )
}