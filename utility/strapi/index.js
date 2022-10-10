import qs from 'qs'
import axios from 'axios'

export function getStrapiURL(path = "") {
   
    return `${
      process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
}


export async function fetchAPI({
    path, 
    urlParamsObject = {}, 
    options = {},
    bearer
}) {

    try {
        // Merge default and user options
        const mergedOptions = {
            headers: {
                "Content-Type": "application/json",
                ...(bearer ? {Authorization: `Bearer ${bearer}`} : {})
            },
            ...options,
        };
        

        // Build request URL
        const queryString = qs.stringify(urlParamsObject);
        const requestUrl = `${getStrapiURL(
            `/api/${path}${queryString ? `?${queryString}` : ""}`
        )}`;
        console.log('mergedOptions', mergedOptions)

        // Trigger API call
        const response = await axios({
            url: requestUrl, 
            ...mergedOptions
        })
      

        const { data, statusText } = response

        return { data, statusText }

    } catch(err) {
        console.log('catch err', err)
        throw err
        // if (err.response) {
        // // The client was given an error response (5xx, 4xx)
        // console.log('response error', err.response.status);
        // // if (err.response.status === 404) setError('Sorry, the page does not exist')
        // } else if (err.request) {
        //     // The client never received a response, and the request was never left
        //     console.log('request error', err.request)
        // } else {
        //     // Anything else
        //     console.log('other error', err.message)
        // }
    }

}