import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const FaIcon = ({icon, className, onClick, onMouseEnter, onMouseLeave}) => {
    
   
    return (
            <FontAwesomeIcon 
                className={className} 
                icon={icon}
                onClick={onClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
    )
}


