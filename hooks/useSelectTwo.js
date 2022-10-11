import { useState, useCallback } from "react"


export const useSelectTwo = () => {

    const [isSelectTwoVisible, setIsSelectTwoVisible] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const [selectedLabel, setSelectedLabel] = useState(null)

    const onSelectClick = useCallback(() => {
        setIsSelectTwoVisible(true)
    }, [])


    
    const onOptionClick = (value, label, e) => {
        // stop propagation in order to prevent event bubbling to the parent div of SelectTwo where onSelectClick is
        e.stopPropagation()
        setIsSelectTwoVisible(false)
        setSelectedValue(value)
        setSelectedLabel(label)

    }


    return {isSelectTwoVisible, onSelectClick, onOptionClick, selectedValue, setSelectedValue, selectedLabel}

}

