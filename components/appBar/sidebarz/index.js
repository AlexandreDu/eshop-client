import React from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../../features/categories/categorySlice";
import { motion } from "framer-motion"
import Link from "next/link";
import { Typography } from "../../typography";


export const Sidebar = ({showSideBar}) => {

    const categories = useSelector(selectCategories)

    const categoriesMapping = {
        "2": {
            title: 'women',
            link: 'women'
        },
        "1": {
            title: 'men',
            link: 'men'
        },
        "3": {
            title:'kids',
            link: 'children'
        }
    }

    const divVariants = {
        hidden: {
            x:'100%'
            
        },
        show: {
            x: '-100%'
        }
    }


    const sidebarVariants = {
        hidden: {
            x:'200%'
            
        },
        show: {
            x: '0'
        }
    }
    

    return (
        <>
            <motion.div
                className="fixed top-[5rem] bottom-0 right-0 z-10 w-screen bg-purple-500"
                animate={showSideBar ? 'show' : 'hidden' }
                variants={divVariants}
                transition={{duration: 0.5, delay: 0.3}}
            ></motion.div>

            <motion.div
                className="fixed top-[5rem] bottom-0 right-0 z-10 w-full bg-white"
                animate={showSideBar ? 'show' : 'hidden' }
                variants={sidebarVariants}
                transition={{duration:0.5, delay: 0.3}}
            >
                <ul className="h-full flex flex-col items-center justify-evenly">
                    <Link href={`/`}>
                        <li className='cursor-pointer'>
                            <Typography component={'span'} variant={'h1'}>ALL PRODUCTS</Typography>
                        </li>
                    </Link>
                        
                    {categories.map(({id}) => {
                        if(!categoriesMapping[id]) return
                        let categoryName = <Typography component={'span'} variant={'h1'}>{categoriesMapping[id].title.toUpperCase()}</Typography>
                    
                        return (
                            <Link key={id} href={`/${categoriesMapping[id].link}`}>
                                <li  className=''>
                                    {categoryName}
                                </li>
                            </Link>
                        )
                    })}
                  
                </ul>
            </motion.div>
        </>
        
            
      
        

    )
}