import { motion, usePresence } from 'framer-motion'

import { FaIcon } from '../icon'
import { faXmark } from "@fortawesome/free-solid-svg-icons"


// Modal must be wrapped by AnimatePresence in order to execute the exit animation before removing it from the dom after the animation is complete 
export const Modal = ({ setIsVisible, children}) => {

    const [isPresent, safeToRemove] = usePresence()


    return (
        
        <motion.div 
            transition={{duration: 0.2}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => {
                !isPresent && safeToRemove()
            }}
            className='bg-black/70 fixed top-[5rem] bottom-0 left-0 right-0 flex justify-center items-center'
        >
            <div className={`w-5/6 max-h-[98%] md:w-1/2 lg:w-1/4 bg-white rounded-lg p-[0.86rem] overflow-auto`}>
                <div className='text-right'>
                    <FaIcon className='text-black text-2xl cursor-pointer' icon={faXmark} onClick={() => {
                        document.body.style.overflow = 'auto'
                        setIsVisible(null)
                    }}/>
                </div>
                <div className='h-full'>
                    {children}
                </div>
            </div>
        </motion.div>
      
    )
}