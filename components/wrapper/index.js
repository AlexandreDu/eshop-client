import { motion } from "framer-motion"

// wrapper for each page. AnimateOnPresence wrap this component in _app.js
export const PageWrapper = ({children}) => {

    const variants = {
        hidden: { opacity: 0, x: -200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 200, },
    }

    return (
    
        <motion.div 
            className="block mx-auto w-[98%]"
            variants={variants} 
            initial="hidden" 
            animate="enter" 
            exit="exit" 
            transition={{ type: 'linear' }} 
        
        >
            <div className='flex justify-center'>
                <div className='w-full md:w-2/4'>
                    {children}
                </div>
            </div>
        </motion.div>
    )
}