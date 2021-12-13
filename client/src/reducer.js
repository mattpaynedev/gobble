import { combineReducers } from "redux";
import collectionReducer from "./features/collection/collectionSlice"
import wineReducer from "./features/wine/wineSlice"



const rootReducer = combineReducers({
    collections: collectionReducer,
    wine: wineReducer,
    // user: userReducer,
})

export default rootReducer