import Axios from "axios"
import { FLOOR_DETAILS_FAIL, FLOOR_DETAILS_REQUEST, FLOOR_DETAILS_SUCCESS, FLOOR_LIST_FAIL, FLOOR_LIST_REQUEST, FLOOR_LIST_SUCCESS } from "../constants/floorConstants"

export const listFloors = () => async (dispatch) => {
  dispatch({
    type: FLOOR_LIST_REQUEST
  })
  try {
    const { data } = await Axios.get('/api/floors')
    dispatch({ type: FLOOR_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: FLOOR_LIST_FAIL, payload: error.message })
  }
}

export const detailsFloor = (floorId) => async (dispatch) => {
  dispatch({ type: FLOOR_DETAILS_REQUEST, payload: floorId })
  try {
    const { data } = await Axios.get(`/api/floors/${floorId}`)
    dispatch({ type: FLOOR_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FLOOR_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

