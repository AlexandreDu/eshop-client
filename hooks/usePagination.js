import { useState, useEffect, useCallback } from "react"


export const usePagination = (list) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(8)

    const handleChangePage = useCallback((pageNumber) => {
       
            setCurrentPage(parseInt(pageNumber, 10))
            if(window) window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
     
    }, [])

    const handleChangePageSize = (value) => {

        setPageSize(parseInt(value, 10))
    }
    
    let startIndex = currentPage * pageSize - pageSize
    const endIndex = startIndex + pageSize
    if(list && startIndex > list.length) {
        startIndex = 0
        
    }
    let rangeList = list && list.slice(startIndex, endIndex)
    

    return {currentPage, setCurrentPage, handleChangePage, pageSize, handleChangePageSize, rangeList}

}

