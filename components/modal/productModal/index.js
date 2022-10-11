import { useEffect } from "react"
import { AnimatePresence } from 'framer-motion'

import {useSelector, useDispatch} from 'react-redux'
import { addProduct } from "../../../features/cart/cartSlice"

import { Modal } from "../index"
import { DetailedProductCard } from "../../cards"
import { RoundedButton } from "../../buttons"
import { useSelectTwo } from "../../../hooks/useSelectTwo"
import { SelectTwo } from "../../select/selectTwo"

import { getInteger } from "../../../utility/getInteger"

import { FaIcon } from "../../icon"
import { faPlus } from "@fortawesome/free-solid-svg-icons"


export const ProductModal = ({productSelected, setProductSelected}) => {

    const dispatch = useDispatch()

    const product = useSelector(state => {
        return state.products.list.find(item => item.id === productSelected)
    })
 

    const handleAddProduct = (e) => {

        let payload = {
          id: productSelected,
          quantity: getInteger(selectedQuantity)
        }
        dispatch(addProduct(payload))
    }


    const options =  new Array(10).fill(null).map((_, index) => {

        return {label: index + 1, value: index + 1}
    })
    
    const {isSelectTwoVisible, onSelectClick, onOptionClick, selectedValue: selectedQuantity, setSelectedValue: setQuantity} = useSelectTwo()
    
  
    useEffect(() => {
        if(!productSelected) setQuantity(null)
    }, [productSelected])
  

  

    return (
        <AnimatePresence>
            {productSelected && (
                <Modal
                setIsVisible={setProductSelected}
            >
                <DetailedProductCard 
                    key={product?.id}
                    title={product?.attributes?.title}
                    category={product?.attributes?.category?.data?.attributes?.name}
                    image={product?.attributes?.image?.data?.attributes?.url}
                    price={product?.attributes?.price}
                    id={product?.id}
                />
                <div className="flex items">
                    <SelectTwo
                        options={options}
                        onSelectClick={onSelectClick}
                        title={selectedQuantity ? selectedQuantity : 'Select the quantity'}
                        onOptionClick={onOptionClick}
                        isVisible={isSelectTwoVisible}
                        selectedQuantity={selectedQuantity}
                    />
                    <RoundedButton 
                        onClick={handleAddProduct}
                        disabled={selectedQuantity ? '' : true}
                        onAnimationComplete={() => {
                            if(selectedQuantity) setProductSelected(null)
                        }}
                    >
                        <FaIcon 
                            icon={faPlus}
                        />
                    </RoundedButton>
                </div>
            </Modal>
            )}
        </AnimatePresence>
        
    )
}