let url

if(process.env.NODE_ENV === 'development') url = 'http://localhost:1337/api'


export const apiEndPoints = {
    products: url + '/products'
}

// 