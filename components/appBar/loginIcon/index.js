import Link from "next/link"
import { isEqual } from "lodash"
import { useSelector } from "react-redux"
import { faUser } from "@fortawesome/free-solid-svg-icons"

import { FaIcon } from "../../icon"





export const LoginIcon = ({}) => {


    const { userId }  = useSelector(state => state.auth, isEqual)
    
    const isLoggedIn = !!userId   
 

    return (
        <Link href={`${isLoggedIn ? '/profile' : '/login' }`} passHref>
            <FaIcon 
                className={`mr-4 cursor-pointer ${isLoggedIn ? 'text-purple-500' : ''}`}
                icon={faUser}
            />
        </Link>
    )
}