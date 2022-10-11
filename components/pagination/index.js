
import { PaginationBox } from "./paginationBox"
import { PageSize } from "./pageSize"

export const Pagination = ({totalCount, pageSize, currentPage, handleChangePage, handleChangePageSize }) => {

   
    let totalPagesCount = Math.ceil(totalCount / pageSize)
  
    let arr = new Array(totalPagesCount).fill(undefined)


    return (
        <div className="flex items-stretch justify-center grow">
            <PageSize 
                pageSize={pageSize} 
                handleChangePageSize={handleChangePageSize} 
            />
            {/* after:grow-[10000] to make the grow of each PaginationBox of the last line negligible  */}
            <div className="flex flex-wrap grow after:grow-[10000000]">
                {arr.map((_, index) => {
                    return (
                        <PaginationBox 
                            key={index} 
                            pageNumber={index + 1} 
                            onClick={handleChangePage} 
                            isSelected={currentPage === index + 1} 
                        />
                    )
                })}
            </div>
        </div>
    )
}