import React, { useEffect, useState } from "react"
import { motion, AnimateSharedLayout } from "framer-motion"
import { useSelector } from "react-redux"
import { selectCategories } from "../../../features/categories/categorySlice"
import { DropDown } from "../../dropDown"
import { selectMenProducts } from "../../../features/products/productSlice"
import { selectWomenProducts } from "../../../features/products/productSlice"
import { selectChildrenProducts } from "../../../features/products/productSlice"
import { isEqual } from "lodash"

export const Footer = () => {

    const categories = useSelector(selectCategories)

    const menProducts = useSelector(selectMenProducts, isEqual)
    const womenProducts = useSelector(selectWomenProducts, isEqual)
    const childrenProducts = useSelector(selectChildrenProducts, isEqual)

    let content = [
        {
            id: 2,
            value: womenProducts?.length || 'loading'
        },
        {
            id: 1,
            value: menProducts?.length || 'loading'
        },
        {
            id: 3,
            value: childrenProducts?.length || 'loading'
        }
    ]
 
    return (
        <motion.footer layout className="bg-slate-400 text-white text-center p-[1rem]">
            <AnimateSharedLayout>
                <ul className="block min-h-[13rem]">
        
                    {categories.map(({attributes: {name}, id}) => {
                        let value = content.find(item => item.id === id)?.value
                    
                        return (
                          
                                    
                            <DropDown 
                                key={id}
                                title={`${name}`}
                                content={[`${value} available products`]}
                            />
                    
                        )
                    })}
                
                  
                </ul>
            </AnimateSharedLayout>
        </motion.footer>    
    )
}