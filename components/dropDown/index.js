import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { FaIcon } from "../icon"
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"

export const DropDown = ({ title, content}) => {




    const [isOpen, setIsOpen] = useState(false)
    

    return (
        <div className="w-full flex justify-end items-center p-2 text-right">
                <div>
                    <div>
                        <span>{title}</span>
                    </div>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.ul 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }} 
                                layout
                            >
                                {content.map(item => <li key={item}>{item}</li>)}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>

            <motion.div 
                layout 
                className="self-start"
            >
                {isOpen ? (
                    <FaIcon 
                        className='ml-2 cursor-pointer'
                        icon={faMinus}
                        // toggle
                        onClick={() => setIsOpen(prevState => !prevState)}
                    />
                ) : (
                    <FaIcon 
                        className='ml-2 cursor-pointer'
                        icon={faPlus}
                        // toggle
                        onClick={() => setIsOpen(prevState => !prevState)}
                    />
                )}
                
            </motion.div>
        </div>    
    )
}


