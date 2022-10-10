import { useState } from "react"
import { BurgerMenu } from "./burgerMenu"
import {Sidebar} from './sidebar'
import { useOutsideClick } from "../../hooks/useOutsideClick"
import { CartIcon } from "../cart/CartIcon"
import { LoginIcon } from "./loginIcon"

export const AppBar = ({}) => {

    const [showSideBar, setShowSideBar] = useState(false)

    const handleShowSideBar = () => {
        setShowSideBar(prevState => !prevState)
    }
    const handleClickOutsideSideBar = () => {
        setShowSideBar(false)
    }
    const ref = useOutsideClick(handleClickOutsideSideBar)

    
    return (
        <>
            <header className="flex flex-row-reverse items-center h-[5rem] p-[1rem] bg-white fixed w-full z-10 shadow-lg shadow-slate-500/50">
                <BurgerMenu 
                    ref={ref} 
                    showSideBar={showSideBar}
                    onClick={handleShowSideBar} 
                />
                <CartIcon />
                <LoginIcon />
            </header>
            <Sidebar 
                showSideBar={showSideBar}
            />
        </>
    )
}



