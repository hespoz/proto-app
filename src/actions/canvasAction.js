import uuidv4 from 'uuid/v4'
import {
    ADD_ELEMENT_TO_SCREEN,
    SET_RESIZE_STATE,
    CLEAR_RESIZE_STATE,
    UPDATE_ELEMENT_POSITION,
    UPDATE_ELEMENT_POSITION_V2,
    RESIZE_ELEMENT,
    UPDATE_LABEL,
    SELECT_ELEMENT,
    REMOVE_ELEMENT,
    SET_HOLD,
    CLEAR_SELECTIONS,
    COPY_SELECTION,
    PASTE,
    ADD_NEW_PAGE,
    SELECT_SCREEN,
    UPDATE_ELEMENT_PROP,
    FETCH_FIELDS_SCREEN,
    SHOW_ADD_NEW_FORM,
    UPDATE_ACTION_ELEMENT_PROP,
    ADD_NEW_ACTION,
    SAVE_LAST_STATE
} from '../commons/constants'

import axios from 'axios'

const hostUrl = process.env.API_HOST || 'http://localhost:9000'

export function addElementToScreen(screenId, type, top, left) {
    return function (dispatch) {
        dispatch({
            type: ADD_ELEMENT_TO_SCREEN, screenId: screenId, element: {
                id: uuidv4(),
                type: type,
                label: type,
                top: top,
                left: left,
                height: 45,
                width: 200
            }
        })
    }
}

export function updateElementPosition(screenId, id, top, left) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_ELEMENT_POSITION, screenId: screenId, element: {
                id: id,
                top: top,
                left: left
            }
        })
    }
}

export function updateElementPositionV2(id, deltaX, deltaY) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_ELEMENT_POSITION_V2, element: {
                id:id,
                deltaX: deltaX,
                deltaY: deltaY
            }
        })
    }
}

export function setResizeState(id) {
    return function (dispatch) {
        dispatch({type: SET_RESIZE_STATE, id: id})
    }
}

export function clearResizeState() {
    return function (dispatch) {
        dispatch({type: CLEAR_RESIZE_STATE, id: null})
    }
}


export function resizeElement(screenId, id, height, width) {
    return function (dispatch) {
        dispatch({
            type: RESIZE_ELEMENT, screenId: screenId, element: {
                id: id,
                height: height,
                width: width
            }
        })
    }
}

export function updateLabel(screenId, id, label) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_LABEL, screenId: screenId, element: {
                id: id,
                label: label
            }
        })
    }
}

export function selectElement(screenId, id, multiple) {
    return function (dispatch) {
        dispatch({
            type: SELECT_ELEMENT, screenId: screenId, element: {
                id: id,
                multiple: multiple
            }
        })
    }
}

export function removeElement(screenId, id) {
    return function (dispatch) {
        dispatch({
            type: REMOVE_ELEMENT, screenId: screenId, id: id
        })
    }
}

export function setHold(hold) {
    return function (dispatch) {
        dispatch({
            type: SET_HOLD, onHold:hold
        })
    }
}

export function clearAllSelections() {
    return function (dispatch) {
        dispatch({type: CLEAR_SELECTIONS})
    }
}

export function copy(screenId) {
    return function (dispatch) {
        dispatch({type: COPY_SELECTION, screenId: screenId})
    }
}

export function paste(screenId) {
    return function (dispatch) {
        dispatch({type: PASTE, screenId: screenId})
    }
}

export function addNewPage(actionId, screenName, copyState) {
    console.log(actionId, screenName, copyState)
    return function (dispatch) {
        dispatch({type: ADD_NEW_PAGE, screenName: screenName, copyState: copyState, actionId:actionId})
    }
}

export function selectScreen(screenId) {
    return function (dispatch) {
        dispatch({
            type: SELECT_SCREEN, screenId: screenId
        })
    }
}

export function updateElementProp(propName, value) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_ELEMENT_PROP, propName:propName, value:value
        })
    }
}

export function fetchFieldsInScreen() {
    return function (dispatch) {
        dispatch({
            type: FETCH_FIELDS_SCREEN
        })
    }
}

export function showAddNewForm(actionId) {
    return function (dispatch) {
        dispatch({
            type: SHOW_ADD_NEW_FORM,
            actionId: actionId
        })
    }
}

export function updateActionElementProp(actionId, propName, value) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_ACTION_ELEMENT_PROP, actionId:actionId, propName:propName, value:value
        })
    }
}

export function addNewAction() {
    return function (dispatch) {
        dispatch({
            type: ADD_NEW_ACTION
        })
    }
}

export function saveLastState(project) {
    return async (dispatch) => {

        const savedProject = await axios.post(`${hostUrl}/save`, project, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        dispatch({
            type: SAVE_LAST_STATE,
            savedProject: savedProject.data
        })



    }
}


