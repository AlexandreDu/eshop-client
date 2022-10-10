

export const PageWrapper = ({children}) => {

    return (
        <div className="block mx-auto w-[98%]">
            <div className='flex justify-center'>
                <div className='w-full md:w-3/4'>
                    {children}
                </div>
            </div>
        </div>
    )
}