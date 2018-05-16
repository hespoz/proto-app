import {
    ADD_ELEMENT_TO_SCREEN,
    UPDATE_ELEMENT_POSITION,
    SET_RESIZE_STATE,
    CLEAR_RESIZE_STATE,
    RESIZE_ELEMENT,
    UPDATE_LABEL,
    SELECT_ELEMENT,
    REMOVE_ELEMENT,
    SET_HOLD,
    CLEAR_SELECTIONS,
    COPY_SELECTION,
    PASTE
} from '../commons/constants'
import _ from 'lodash'

import uuidv4 from 'uuid/v4'

const addElement = (state, action) => {
    const screenListCopy = _.cloneDeep(state.screenList)

    screenListCopy[action.screenId].push(action.element)

    return {...state, screenList: screenListCopy, selectedElements: [action.element.id]}
}

const updateElementPosition = (state, action) => {
    let screenListCopy = _.cloneDeep(state.screenList)

    screenListCopy[action.screenId] = screenListCopy[action.screenId].map((element) => {
        if (element.id === action.element.id) {
            element.top = action.element.top
            element.left = action.element.left
        }
        return element
    })

    return {
        ...state,
        screenList: screenListCopy
    }
}

const resizeElement = (state, action) => {
    let screenListCopy = _.cloneDeep(state.screenList)

    screenListCopy[action.screenId] = screenListCopy[action.screenId].map((element) => {
        if (element.id === action.element.id) {
            element.height = action.element.height
            element.width = action.element.width
        }
        return element
    })

    return {
        ...state,
        screenList: screenListCopy
    }
}

const updateLabel = (state, action) => {
    let screenListCopy = _.cloneDeep(state.screenList)

    screenListCopy[action.screenId] = screenListCopy[action.screenId].map((element) => {
        if (element.id === action.element.id) {
            element.label = action.element.label
        }
        return element
    })

    return {
        ...state,
        screenList: screenListCopy
    }
}

const selectElement = (state, action) => {
    let selectedElements = _.cloneDeep(state.selectedElements)


    if(!state.onHold) {
        selectedElements=[]
    }

    selectedElements.push(action.element.id)

    return {...state, selectedElements: selectedElements}
}

const removeElement = (state, action) => {
    let screenListCopy = Object.assign({}, state.screenList)

    console.log(_.remove(screenListCopy[action.screenId], (e) => {
       return e.id === action.id
    }))
    screenListCopy[action.screenId] = _.pull(screenListCopy[action.screenId], {id: action.id});



    return {
        ...state,
        screenList: screenListCopy
    }
}

const copyToClipboard = (state, action) => {
    let clipBoard = _.filter(state.screenList[action.screenId], (element) => {
        return _.find(state.selectedElements, (id) => {return id === element.id})
    })

    console.log(clipBoard)
    return {
        ...state,
        clipboardElements: clipBoard
    }

}


const paste = (state, action) => {

    let screenListCopy = Object.assign({}, state.screenList)

    let newElements = _.map(state.clipboardElements, (element) => {
        return {
            id:uuidv4(),
            height: element.height,
            label: element.label,
            left: element.left + 20,
            top: element.top + 20,
            type: element.type,
            width: element.width + 20
        }
    })

    screenListCopy[action.screenId] = _.concat(screenListCopy[action.screenId], newElements)

    return {
        ...state,
        screenList: screenListCopy
    }

}

export default function reducer(state = {
    screenList: {1: []},
    resizeElementId: null,
    selectedElements:[],
    onHold:false,
    clipboardElements:[]
}, action) {
    switch (action.type) {
        case ADD_ELEMENT_TO_SCREEN:
            return addElement(state, action)
            break;
        case UPDATE_ELEMENT_POSITION:
            return updateElementPosition(state, action)
            break;
        case RESIZE_ELEMENT:
            return resizeElement(state, action)
            break;
        case UPDATE_LABEL:
            return updateLabel(state, action)
            break;
        case SET_RESIZE_STATE:
            return {...state, resizeElementId: action.id}
            break;
        case CLEAR_RESIZE_STATE:
            return {...state, resizeElementId: null}
            break;
        case SELECT_ELEMENT:
            return selectElement(state, action)
            break;
        case REMOVE_ELEMENT:
            return removeElement(state, action)
            break;
        case SET_HOLD:
            return {...state, onHold: action.onHold}
            break;
        case CLEAR_SELECTIONS:
                return {...state, selectedElements: []}
            break;
        case COPY_SELECTION:
            return copyToClipboard(state, action)
            break;
        case PASTE:
            return paste(state, action)
            break;
        default:
            break;
    }

    return state
}
