import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { floorDetailsReducer, floorListReducer } from './reducers/floorReducers';
import { orderDeleteReducer, orderListReducer } from './reducers/orderReducer';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
  },
}
const reducer = combineReducers({
  floorList: floorListReducer,
  floorDetails: floorDetailsReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,


})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store;