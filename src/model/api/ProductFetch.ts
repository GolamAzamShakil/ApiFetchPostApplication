"use server"

export async function productFetch() {
    try {
        const api = process.env.PRODUCT_API
        if (!api) throw new Error('API URL is not defined in environment variables')
        
        //const response = await axios.get<ProductApiModel>("")
        return api;
    } catch (error) {
        console.error ("Something went wrong: ", error)
        return error;
    }
}