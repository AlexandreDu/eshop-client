import Link from "next/link"
import { useSelector } from "react-redux"
import { FaIcon } from "../../icon"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { isEqual } from "lodash"

export const LoginIcon = ({}) => {


    const {email , jwt, userId, userName }  = useSelector(state => state.auth, isEqual)
    
    const isLoggedIn = !!userId   
 

    return (
        <Link href={`${isLoggedIn ? '/profile' : '/login' }`}>
            <FaIcon 
                className={`mr-4 cursor-pointer ${isLoggedIn ? 'text-purple-500' : ''}`}
                icon={faUser}
            />
        </Link>
    )
}