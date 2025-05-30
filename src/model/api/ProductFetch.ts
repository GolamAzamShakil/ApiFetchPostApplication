import axios from "axios";
import { ProductApiModel } from "../data/interfaces";

export async function productFetch() {

    try {
        const response = await axios.get<ProductApiModel>("https://glore-bd-backend-node-mongo.vercel.app/api/product")
        return response;
    } catch (error) {
        console.error ("Something went wrong: ", error)
        return error;
    }
}