import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";
// import axios from "axios";
const initialState = {
  items: [],
  isAuthenticated: false
};

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
export default store;
