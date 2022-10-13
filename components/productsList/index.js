import { useState } from 'react'

import { SelectTwo } from '../select/selectTwo'
import { useSelectTwo } from '../../hooks/useSelectTwo'
import { useSort } from '../../hooks/useSort'
import { ProductCard } from '../cards'
import { ProductModal } from '../modal/productModal'
import { Pagination } from '../pagination'
import { usePagination } from '../../hooks/usePagination'

import { FaIcon } from '../icon'
import { faSort } from "@fortawesome/free-solid-svg-icons"

export default function ProductsList({products, title}) {

  
  const {isSelectTwoVisible, onSelectClick, onOptionClick, selectedValue: sortValue, selectedLabel: sortLabel} = useSelectTwo()


  let sortOptions = [
    {label: 'lowest price', value: 1},
    {label: 'highest price', value: 2},
    {label: 'highest rate', value: 3},
    {label: 'highest review count', value: 4},
    {label: 'recommended', value: 5},
  ]

  const sortedProducts = useSort(products, sortValue)

  const {currentPage, handleChangePage, pageSize, handleChangePageSize, rangeList} = usePagination(sortedProducts)

  const [productSelected, setProductSelected] = useState(null)
  
  const selectProduct = (id) => {
    
    setProductSelected(id)
  }
  

  let sortTitle = (
    <>
      <FaIcon 
          className='ml-2 cursor-pointer text-purple-800'
          icon={faSort}
      />
      {sortLabel ? ` sorted by ${sortLabel }`: ' sort by'}
    </>
  )
  

  return (
    <>
    
      {title && (
        title
      )}
      <div className='flex justify-end'>
        <SelectTwo 
          options={sortOptions}
          onSelectClick={onSelectClick}
          title={sortTitle}
          onOptionClick={onOptionClick}
          isVisible={isSelectTwoVisible}
        />
      </div>
      <div className='flex flex-wrap justify-between'>
        {rangeList && rangeList.map( product => (
        <ProductCard 
            key={product?.id}
            title={product?.attributes?.title}
            category={product?.attributes?.category?.data?.attributes?.name}
            image={product?.attributes?.image?.data?.attributes?.url}
            price={product?.attributes?.price}
            ratingCount={product?.attributes?.ratingCount}
            rate={product?.attributes?.rate}
            id={product?.id}
            onClick={selectProduct}
        />
        ))}
      </div>
      <Pagination 
          totalCount={products.length}
          pageSize={pageSize}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
          handleChangePageSize={handleChangePageSize}
       />

      <ProductModal 
          productSelected={productSelected} 
          setProductSelected={setProductSelected}
      />
    </>
  )
}



