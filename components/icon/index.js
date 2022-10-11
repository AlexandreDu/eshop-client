import { forwardRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



export const FaIcon = forwardRef(({icon, className, onClick, onMouseEnter, onMouseLeave}, ref) => {
    
   
    return (
            <FontAwesomeIcon 
                className={className} 
                icon={icon}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                ref={ref}
            />
    )
})

