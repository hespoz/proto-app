import {
    MOVE_TO_STATE,
    OPEN_FLOW_DIALOG,
    CLOSE_FLOW_DIALOG
} from '../commons/constants'

export function moveToState(screenId) {
    return async (dispatch) => {

        dispatch({
            type: MOVE_TO_STATE,
            toScreen: screenId
        })

    }
}

export function openFlowDialog(flowActions) {
    return async (dispatch) => {

        dispatch({
            type: OPEN_FLOW_DIALOG,
            flowActions: flowActions
        })

    }
}

export function closeFlowDialog(actionList) {
    return async (dispatch) => {

        dispatch({
            type: CLOSE_FLOW_DIALOG
        })

    }
}