import { tagReducer } from "./tagreducer";
import {courseReducer} from "./courseReducer";
import { cartReducer} from "./cartReducer";
import {createStore, combineReducers } from "redux";

export const rootReducer = combineReducers({
    cart: cartReducer,
    tag: tagReducer,
    courses: courseReducer,
});

