import React, { useEffect, useState } from "react"
import { motion, AnimateSharedLayout } from "framer-motion"
import { isEqual } from "lodash"

import { useSelector } from "react-redux"
import { selectCategories } from "../../../features/categories/categorySlice"
import { selectMenProducts, selectWomenProducts, selectChildrenProducts } from "../../../features/products/productSlice"

import { DropDown } from "../../dropDown"


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
        <footer className="bg-purple-800 text-white text-center p-[1rem]">
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
        </footer>    
    )
}