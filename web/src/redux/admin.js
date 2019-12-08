import axios from "axios";

const TOGGLE_QUESTION = "/api/questionbank/toggle/";
const GET_QUESTION_BANK_ALL_API = "/api/questionbank/all";
const GET_ROOMS_API = "/api/rooms";
const GET_ROOM_API = "/api/rooms/";

export const GET_QUESTION_BANK_ALL = "GET_QUESTION_BANK_ALL";
export const GET_ROOMS = "GET_ROOMS";
export const GET_ROOM = "GET_ROOM";

export const toggleQuestion = async questionId => {
  try {
    const response = await axios.get(TOGGLE_QUESTION + questionId);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchQuestionBankAll = () => async dispatch => {
  try {
    const response = await axios.get(GET_QUESTION_BANK_ALL_API);
    dispatch({
      type: GET_QUESTION_BANK_ALL,
      payload: { ...response.data }
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchRooms = () => async dispatch => {
  try {
    const response = await axios.get(GET_ROOMS_API);
    dispatch({
      type: GET_ROOMS,
      payload: { ...response.data }
    });
  } catch (error) {
    console.error(error);
  }
};

export const fetchRoom = id => async dispatch => {
  try {
    const response = await axios.get(GET_ROOM_API + id);
    dispatch({
      type: GET_ROOM,
      payload: { ...response.data }
    });
  } catch (error) {
    console.error(error);
  }
};
