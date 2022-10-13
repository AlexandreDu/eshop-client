import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion"

import { useSelector } from "react-redux"
import { selectCategories } from "../../../features/categories/categorySlice"

import { SidebarLink } from "./sidebarLink"

import { categoriesMapping } from "../../../data/categories"

export const Sidebar = ({showSideBar}) => {

    const router = useRouter()

    const categories = useSelector(selectCategories)

  
    const sidebarVariants = {
        hidden: {
            zIndex: -1,
            opacity: 0,

            
        },
        show: {
            opacity: 1,
            zIndex: 10,
            transition: {
                when: 'beforeChildren',
                
              },
            
        }
    }

    const sidebarItemsVariants = {
        hidden: {
            y: -100,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        },
        show: {
            y: 0,
            scale: 1,
            opacity: 1
           
        }
    }
    

   

    return (
        <>
            <motion.nav
                className="fixed top-[5rem] bottom-0 right-0 z-0 w-full bg-purple-800"
                initial={{opacity: 0, zIndex: 0}}
                animate={showSideBar ? 'show' : 'hidden' }
                variants={sidebarVariants}
                // exit={{ opacity: 0 }}
                transition={{duration: 0.5}}
           
         
            >
                <motion.ul 
                    className="h-full flex flex-col items-center justify-evenly"
                    variants={sidebarItemsVariants}
                    initial={{zIndex: 0}}
                >
                    <SidebarLink 
                        label={'ALL PRODUCTS'}
                        href={'/'}
                        animate={showSideBar ? 'show' : 'hidden' }
                        initial={{zIndex: 0}}
                        variants={sidebarItemsVariants}
                        isActive={router.pathname === "/"}
                    />
                        
                    {categories.map(({id}) => {
                        if(!categoriesMapping[id]) return
                        let pathname = router.pathname.replace('/', '')
                        return (
                            <SidebarLink 
                                key={id}
                                label={categoriesMapping[id].title.toUpperCase()}
                                href={categoriesMapping[id].link}
                                animate={showSideBar ? 'show' : 'hidden' }
                                initial={{zIndex: 0}}
                                variants={sidebarItemsVariants}
                                isActive={pathname === categoriesMapping[id].link}
                            />
                            
                
                        )
                    })}
                  
                </motion.ul>
            </motion.nav>
        </>
        
            
      
        

    )
}