import { combineReducers } from "redux"

import canvas from "./canvasReducer"
import config from "./configReducer"

export default combineReducers({
    canvas,
    config
})
