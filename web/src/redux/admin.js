import axios from "axios";

const TOGGLE_QUESTION = "/api/questionbank/toggle/";

export const toggleQuestion = async questionId => {
  try {
    const response = await axios.get(TOGGLE_QUESTION + questionId);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
