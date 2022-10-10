import { Errormessage } from "../errorMessage"

export const Field = ({type, label, placeholder = '', register, name, rules={}, errorMessage}) => {


   

    return (
        <div className='my-2'>
            <label className="block my-2">
                {label}
            </label>
            <input 
                className="border border-purple-500 p-2 rounded-sm w-full"
                type={type} 
                {...register(name, rules)} 
                placeholder={placeholder}
            />
            
            <Errormessage 
                errorMessage={errorMessage}
            />
        </div>
    )
}