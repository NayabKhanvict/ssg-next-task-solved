import axios from "axios"; // Assuming you have Axios installed

export const fetchData = async (person: string) => {
  try {
    const response = await axios.get(`/api/person?person=${person}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
