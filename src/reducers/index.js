import { combineReducers } from "redux"

import canvas from "./canvasReducer"
import project from "./projectReducer"

export default combineReducers({
    canvas,
    project
})
