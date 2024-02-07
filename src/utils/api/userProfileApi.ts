import axios from "axios";

export const fetchData = async (person: string | null) => {
  try {
    const response = await axios.get(`/api/person?person=${person}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
