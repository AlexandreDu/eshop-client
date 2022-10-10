
export const PaginationBox = ({pageNumber, isSelected, onClick}) => {

    return (
        <div onClick={() => onClick(pageNumber)} className={`${isSelected ? 'bg-purple-500 text-white font-bold ' : 'bg-white text-black '} border-purple-200 border-[0.1rem] leading-[2.3rem] basis-[2.5rem] rounded-[0.25rem] text-center cursor-pointer grow`}>
            {pageNumber}
        </div>
    )
}