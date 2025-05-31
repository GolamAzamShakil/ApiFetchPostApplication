"use server"

export async function registerFormPost() {
    try {
        const api = process.env.REGISTER_API
        if (!api) throw new Error('API URL is not defined in environment variables')
        
        return api;
    } catch (error) {
        console.error ("Something went wrong: ", error)
        return error;
    }
}