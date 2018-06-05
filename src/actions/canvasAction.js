import uuidv4 from 'uuid/v4'
import {
    ADD_ELEMENT_TO_SCREEN,
    SET_RESIZE_STATE,
    CLEAR_RESIZE_STATE,
    UPDATE_ELEMENT_POSITION,
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
    TEXT_FIELD,
    TEXT_AREA,
    BUTTON,
    UPDATE_ELEMENT_PROP,
    FETCH_FIELDS_SCREEN
} from '../commons/constants'


const propsByType = (type) => {
    switch(type) {
        case TEXT_FIELD: case TEXT_AREA:
                return {
                    name : {
                        label:"Name",
                        value: type === TEXT_FIELD ? 'TextField' : 'TextArea'
                    },
                    fieldType : {
                        label:"Field type",
                        value:"SELECT_OPTION",
                        options:[
                            {
                                key: "SELECT_OPTION",
                                value: "SELECT_OPTION",
                                text: "Select option"
                            },
                            {
                                key: "NOT_EMPTY",
                                value: "NOT_EMPTY",
                                text: "Not empty"
                            },
                            {
                                key: "EMAIL",
                                value: "EMAIL",
                                text: "Email"
                            },
                            {
                                key: "PASSWORD",
                                value: "PASSWORD",
                                text: "Password"
                            },
                            {
                                key: "NUMERIC",
                                value: "NUMERIC",
                                text: "Numeric"
                            },
                            {
                                key: "DATE",
                                value: "DATE",
                                text: "Date"
                            },
                            {
                                key: "DATETIME",
                                value: "DATETIME",
                                text: "Date time"
                            },
                            {
                                key: "TIME",
                                value: "TIME",
                                text: "Time"
                            }
                        ]
                    }
                }

            break;
        case BUTTON:
            return {
                actionName:{
                    label:"Action name",
                    value:"",
                },
                actionDescription:{
                    label:"Action description",
                    value:"",
                },
                actionParameters:{
                    label:"Action parameters",
                    value:[],
                },
                goToState:{
                    label:"Go to state",
                    value:-1,
                }
            }
            break;
        default:
                return []
            break;
    }
}

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
                width: 200,
                props:propsByType(type)
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

export function addNewPage() {
    return function (dispatch) {
        dispatch({type: ADD_NEW_PAGE})
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



