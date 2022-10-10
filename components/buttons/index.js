import { motion } from 'framer-motion'

export const Button = ({children, fullWidth = false, extraClass, onClick, disabled, onAnimationComplete, type = 'text'}) => {
   


    let className = `min-w-[3.5rem] ${fullWidth ? 'w-full' : 'mx-2'} ${disabled ? 'bg-purple-500/50' : 'bg-purple-500'} my-2 text-white border-1 p-1  cursor-pointer` + ' ' + extraClass
    
   

    return (
        <motion.button 
            whileTap={!!!disabled ? { scale: 0.5 } : {}}
            onClick={onClick} 
            className={className}
            disabled={disabled}
            onAnimationComplete={onAnimationComplete}
            type={type}
        >
            {children}
        </motion.button>
    )
}

export const SubmitButton = ({children, fullWidth}) => {

    return (
        <Button type='submit' fullWidth={fullWidth}>
            {children}
        </Button>
    )
}

export const RoundedButton = ({children, fullWidth, extraClass='', onClick, disabled, onAnimationComplete}) => {


    return (
        <Button
            onClick={onClick} 
            fullWidth={fullWidth}
            disabled={disabled} 
            onAnimationComplete={onAnimationComplete}
            extraClass={'rounded-full' + ' ' + extraClass}
        >
            {children}
        </Button>
    )
}

