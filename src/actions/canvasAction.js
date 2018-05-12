import uuidv4 from 'uuid/v4'
import {
    ADD_ELEMENT_TO_SCREEN,
    SET_RESIZE_STATE,
    CLEAR_RESIZE_STATE,
    UPDATE_ELEMENT_POSITION,
    RESIZE_ELEMENT,
    UPDATE_LABEL,
    SELECT_ELEMENT,
    REMOVE_ELEMENT
} from '../commons/constants'

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