import { combineReducers } from "redux"

import canvas from "./canvasReducer"
import project from "./projectReducer"
import runner from "./runnerReducer"

export default combineReducers({
    canvas,
    project,
    runner
})
