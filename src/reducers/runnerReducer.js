import {
    MOVE_TO_STATE,
    OPEN_FLOW_DIALOG,
    CLOSE_FLOW_DIALOG
} from "../commons/constants";

export default function reducer(state = {
    currentScreenId:null,
    openFlowDialog:false,
    flowActions:[]
}, action) {
    switch (action.type) {
        case MOVE_TO_STATE:
            return {
                ...state,
                currentScreenId:action.toScreen
            }
            break;
        case OPEN_FLOW_DIALOG:
            return {
                ...state,
                openFlowDialog:true,
                flowActions:action.flowActions
            }
            break;
        case CLOSE_FLOW_DIALOG:
            return {
                ...state,
                openFlowDialog:false
            }
            break;
        default:
            break;
    }

    return state
}