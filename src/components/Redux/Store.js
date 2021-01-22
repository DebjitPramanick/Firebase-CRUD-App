import {createStore, combineReducers} from 'redux'
import { idReducer } from "./Reducer"

const store = createStore(idReducer);

export default store;