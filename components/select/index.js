

export const Select = ({value, onChange, children}) => {

    return (
        <select
            className="border-none pr-[1rem] focus:outline-blue-500 bg-slate-200 rounded-lg p-1"
            value={value}
            onChange={onChange}
        >
            {children}
        </select>
    )
}