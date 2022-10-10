import { motion, AnimatePresence } from 'framer-motion'


// options is an array with object to each index with label and value key
export const SelectTwo = ({options, onSelectClick, title, onOptionClick, isVisible}) => {



    return (
        
        <div
            className='min-w-[2rem] my-1 cursor-pointer'
            onClick={onSelectClick} 
        >
            <span>{title}</span>
                <AnimatePresence>
                    {isVisible && (
                        <motion.ul
                            initial={{ y: '100%'}}
                            animate={{ y: '0'}}
                            exit={{ y: '100%' }}
                            className="fixed left-0 right-0 bottom-0 w-screen bg-white z-10"
                        >
                            {options.map(({label, value}) => (
                                <li 
                                    className='font:semibold text-xl border-b-2 border-purple-200 ml-8 lg:ml-2 p-2 text-left cursor-pointer'
                                    key={value} 
                                    onClick={(e) => onOptionClick(value, label, e)} 
                                    id={value}
                                >
                                        {label}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                    
                </AnimatePresence>
            
        </div>
    )
}