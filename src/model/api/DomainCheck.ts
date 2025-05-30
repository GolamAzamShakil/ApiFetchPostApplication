import axios from 'axios'
import { domainCheckingProcess } from '../data/DomainCheckingProcess';
import { DomainResponseModel } from '../data/interfaces';

export async function domainCheck (data: string) {
    let payload: DomainResponseModel | undefined;
    try {
      const response = await axios.get(`https://interview-task-green.vercel.app/task/domains/check/${data}.expressitbd.com`)
      payload = response.data;
      return payload?.data.taken
    } catch (error) {
      console.error ("Something went wrong: ", error)
    }

    //await new Promise((resolve) => setTimeout(resolve, 2000));

    return payload?.data.taken
}