import { useState } from "react"
import Link from "next/link"

import { useSelector } from "react-redux"
import { selectCategories } from "../../features/categories/categorySlice"

import { BurgerMenu } from "./burgerMenu"
import {Sidebar} from './sidebarz'
import { CartIcon } from "../cart/CartIcon"
import { LoginIcon } from "./loginIcon"
import { useOutsideClick } from "../../hooks/useOutsideClick"

import { categoriesMapping } from "../../data/categories"

const AppBarLink = ({label, href}) => {

    return (
        <Link 
            href={href} 
            scroll={false}
        >
            <li 
                className='cursor-pointer mx-4'
            >
                {label}                                
            </li>
        </Link>
    )
}

export const AppBar = ({}) => {


    const categories = useSelector(selectCategories)

    const [showSideBar, setShowSideBar] = useState(false)

    const handleShowSideBar = () => {
        setShowSideBar(prevState => !prevState)
    }
    const handleClickOutsideSideBar = () => {
        setShowSideBar(false)
    }
    const ref = useOutsideClick(handleClickOutsideSideBar)


    const appBarNavLinks = (
        <ul className="flex">
            <AppBarLink
                label={'ALL PRODUCTS'}
                href={`/`}
            />
            {categories.map(({id}) => {
                if (!categoriesMapping[id]) return
                
                return (
                    <AppBarLink
                        key={id}
                        label={categoriesMapping[id].title.toUpperCase()}
                        href={`/${categoriesMapping[id].link}`}
                    />
                )
            })}
        </ul>
    )
    
    return (
        <>
            <header className="flex flex-row-reverse items-center h-[5rem] p-[1rem] bg-white fixed w-full z-10 shadow-lg shadow-slate-500/50">
                {/* mobile burger menu */}
                <div className="md:hidden">
                    <BurgerMenu 
                        ref={ref} 
                        showSideBar={showSideBar}
                        onClick={handleShowSideBar} 
                    />
                </div>
                <CartIcon />
                <LoginIcon />
                {/* desktop navbar */}
                <nav className="hidden md:block">
                    {appBarNavLinks}
                </nav>
            </header>
            <Sidebar 
                categoriesMapping={categoriesMapping}
                showSideBar={showSideBar}
            />
        </>
    )
}



