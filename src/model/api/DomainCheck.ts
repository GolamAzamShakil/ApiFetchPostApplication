import axios from 'axios'
import { DomainResponseModel } from '../data/interfaces';

export async function domainCheck (data: string) {
    let payload: DomainResponseModel | undefined;
    try {
      const baseApi = process.env.NEXT_PUBLIC_DOMAIN_BASE_API;
      if (!baseApi) throw new Error('API base URL is not defined');
      const finalApi =  baseApi.replace("{inputData}", encodeURIComponent(data.trim()));

      const response = await axios.get(`${finalApi}`)
      payload = response.data;
      return payload?.data.taken
    } catch (error) {
      console.error ("Something went wrong: ", error)
    }

    //await new Promise((resolve) => setTimeout(resolve, 2000));

    return payload?.data.taken
}