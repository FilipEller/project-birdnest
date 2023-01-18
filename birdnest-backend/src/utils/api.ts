import axios from 'axios';
import { BIRDNEST_URL } from './config';

const fetch = async (path: string): Promise<unknown> => {
  try {
    const { data } = await axios.get<unknown>(`${BIRDNEST_URL}/${path}`);
    return data;
  } catch (err) {
    let errorMessage = 'Error calling API.';
    if (err instanceof Error) {
      errorMessage += err.message;
    }
    console.log(errorMessage);
    return {};
  }
};

export default { fetch };
