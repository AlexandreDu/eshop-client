import React from "react"
import { motion } from 'framer-motion'

export const BurgerMenu = React.forwardRef(({onClick, showSideBar}, ref) => {

    const variant = showSideBar ? "opened" : "closed";

    const top = {
        closed: {
          rotate: 0,
          translateY: 0
        },
        opened: {
          rotate: 45,
          translateY: 2
        }
      };
      const center = {
        closed: {
          opacity: 1
        },
        opened: {
          opacity: 0
        }
      };
      const bottom = {
        closed: {
          rotate: 0,
          translateY: 0
        },
        opened: {
          rotate: -45,
          translateY: -2
        }
      }

      const width = 24
      const height = 24
      const unitHeight = 4
      const unitWidth = (unitHeight * width) / height


    return (
        <div ref={ref} className="cursor-pointer" onClick={onClick}>
            <motion.svg overflow="visible" height={height} width={width} viewBox={`0 0 ${unitWidth} ${unitHeight}`}>
                <motion.line animate={variant} variants={top} x1="0" x2={unitWidth} y1="0" y2="0" stroke="black" strokeWidth={0.5} />
                <motion.line animate={variant} variants={center } x1="0" x2={unitWidth} y1="2" y2="2" stroke="black" strokeWidth={0.5} />
                <motion.line animate={variant} variants={bottom} x1="0" x2={unitWidth} y1="4" y2="4" stroke="black" strokeWidth={0.5} />
            </motion.svg>
        </div>
    )
    
})

BurgerMenu.displayName = 'BurgerMenu'