import {MOVE_TO_STATE} from "../commons/constants";

export default function reducer(state = {
    currentScreenId:null
}, action) {
    switch (action.type) {
        case MOVE_TO_STATE:
            return {
                ...state,
                currentScreenId:action.toScreen
            }
            break;
        default:
            break;
    }

    return state
}