 const rules =  {
    email: {
        required: 'This field is required.', 
        minLength: {
            value: 3, 
            message: `This field must contain at least 3 characters`
        },
    },
    password: {
        required: 'This field is required.', 
        minLength: {
            value: 6, 
            message: `This field must contain at least 6 characters`
        },
    },
    username: {
        required: 'This field is required.', 
        minLength: {
            value: 3, 
            message: `This field must contain at least 3 characters`
        },
    }
}

export default rules
