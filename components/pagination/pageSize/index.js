
export const PageSize = ({pageSize, handleChangePageSize}) => {

    let optionsValues = ['4', '8', '12']

    return (
            <select className="outline-none cursor-pointer rounded-sm border-purple-200 focus:border-blue-500  border-[0.1rem] p-2 " value={pageSize} onChange={(e => handleChangePageSize(e.target.value))}>
                {optionsValues.map(value => (
                    <option key={value} value={value}>{value} / page</option>
                ))}
            </select>
    )
}