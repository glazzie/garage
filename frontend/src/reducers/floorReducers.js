import { FLOOR_LIST_FAIL, FLOOR_LIST_REQUEST, FLOOR_LIST_SUCCESS, FLOOR_DETAILS_REQUEST, FLOOR_DETAILS_SUCCESS, FLOOR_DETAILS_FAIL } from '../constants/floorConstants'

export const floorListReducer = (state = { loading: true, floors: [] }, action) => {
  switch (action.type) {
    case FLOOR_LIST_REQUEST:
      return { loading: true }
    case FLOOR_LIST_SUCCESS:
      return { loading: false, floors: action.payload }
    case FLOOR_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
export const floorDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case FLOOR_DETAILS_REQUEST:
      return { loading: true }
    case FLOOR_DETAILS_SUCCESS:
      return { loading: false, floor: action.payload }
    case FLOOR_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

