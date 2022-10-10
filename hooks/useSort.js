import { cloneDeep } from "lodash"

export const useSort = (list, sortValue) => {

    if(!list || list?.length === 0) return
    
    if(!sortValue) return list

    let listCopy = cloneDeep(list)


    // lowest price
    if(sortValue === 1) {
        return listCopy.sort((a, b) => a?.attributes?.price - b?.attributes?.price)
    }
    // highest price
    if(sortValue === 2) {
        return listCopy.sort((a, b) => b?.attributes?.price - a?.attributes?.price)
    }
    // highest rate
    if(sortValue === 3) {
        return listCopy.sort((a, b) => b?.attributes?.rate - a?.attributes?.rate)
    }
    // highest review count
    if(sortValue === 4) {
        return listCopy.sort((a, b) => b?.attributes?.ratingCount - a?.attributes?.ratingCount)
    }
    // recommended
    if(sortValue === 5) {
        return list
    }
    
}

