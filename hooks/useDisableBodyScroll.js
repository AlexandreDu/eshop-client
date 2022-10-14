import { useEffect } from 'react';
// import { useGetBodyDimensions } from './useGetBodyDimensions'

export const useDisableBodyScroll = (isDisable) => {

//   const {width: bodyWidth} = useGetBodyDimensions()

  useEffect(() => {
    
    if (isDisable) {
      document.body.style.overflow = 'hidden'
      return
    } 
    if (!isDisable) {
      document.body.style.overflow = 'unset'
    }
    
  }, [isDisable])


}

