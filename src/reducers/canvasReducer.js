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
    PASTE,
    ADD_NEW_PAGE,
    SELECT_SCREEN,
    UPDATE_ELEMENT_PROP,
    FETCH_FIELDS_SCREEN,
    TEXT_FIELD,
    TEXT_AREA
} from '../commons/constants'
import _ from 'lodash'

import uuidv4 from 'uuid/v4'

const getIndexByScreenId = (screenList, selectedPageId) => {
    return _.findIndex(screenList, (s) => {
        return s.id === selectedPageId
    })
}

const addElement = (state, action) => {
    const screenListCopy = _.cloneDeep(state.screenList)

    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = state.screenList[index]

    screen.elements.push(action.element)

    screenListCopy[index] = screen

    return {
        ...state,
        screenList: screenListCopy,
        selectedElements: [action.element.id],
        selectedElementInfo: action.element
    }
}

const removeElement = (state, action) => {
    const screenListCopy = _.cloneDeep(state.screenList)

    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = state.screenList[index]

    _.remove(screen.elements, (e) => {
        return e.id === action.id
    })

    screenListCopy[index] = screen

    return {
        ...state,
        screenList: screenListCopy,
        selectedElementInfo:null
    }
}

const updateElementPosition = (state, action) => {
    let screenListCopy = _.cloneDeep(state.screenList)
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = state.screenList[index]


    screenListCopy[index].elements = screen.elements.map((element) => {
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
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = state.screenList[index]


    screenListCopy[index].elements = screen.elements.map((element) => {
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
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = state.screenList[index]


    screenListCopy[index].elements = screen.elements.map((element) => {
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

    let selectedElementInfo = null
    if(selectedElements.length === 1) {
        const index = getIndexByScreenId(state.screenList, state.selectedPageId)
        let screen = state.screenList[index]
        selectedElementInfo = getSelectedElementInfo(screen, selectedElements[0])
    } else {
        selectedElementInfo = null
    }

    return {
        ...state,
        selectedElements: selectedElements,
        selectedElementInfo:selectedElementInfo
    }
}

const getSelectedElementInfo = (screen, elementIndex) => {
        return _.find(screen.elements, (element) => {
            return element.id === elementIndex
        })
}

const copyToClipboard = (state, action) => {
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = state.screenList[index]

    let clipBoard = _.filter(screen.elements, (element) => {
        return _.find(state.selectedElements, (id) => {return id === element.id})
    })

    return {
        ...state,
        clipboardElements: clipBoard
    }

}


const paste = (state, action) => {

    let screenListCopy = _.cloneDeep(state.screenList)
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = state.screenList[index]


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

    screen.elements = _.concat(screen.elements, newElements)

    screenListCopy[index] = screen

    return {
        ...state,
        screenList: screenListCopy
    }

}

const addNewPage = (state) => {

    let screenListCopy = _.cloneDeep(state.screenList)

    screenListCopy.push({
        id:uuidv4(),
        name:`Screen ${screenListCopy.length}`,
        elements:[]
    })

    return {
        ...state,
        screenList: screenListCopy
    }
}

const updateElementProp = (state, action) => {

    let screenListCopy = _.cloneDeep(state.screenList)
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = _.cloneDeep(state.screenList[index])


    let selectedElementInfoCopy = _.cloneDeep(state.selectedElementInfo)
    screenListCopy[index].elements = screen.elements.map((element) => {
        if (element.id === selectedElementInfoCopy.id) {
            element.props[action.propName].value = action.value
            selectedElementInfoCopy = element
        }
        return element
    })

    return {
        ...state,
        screenList: screenListCopy,
        selectedElementInfo: selectedElementInfoCopy
    }

}


const fetchFieldsInScreen = (state) => {
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = _.cloneDeep(state.screenList[index])

    let fieldOptions = []
    _.forEach(screen.elements, (element) => {
        if(element.type === TEXT_FIELD || element.type === TEXT_AREA) {
            fieldOptions.push({
                key:element.props.name.value,
                value:element.props.name.value,
                text:element.props.name.value
            })
        }

    })

    return {
        ...state,
        fieldsCurrentScreen: fieldOptions
    }

}

const defaultScreenId = uuidv4()

export default function reducer(state = {
    screenList: [{
        id:defaultScreenId,
        name: 'Screen',
        elements:[]
    }],
    selectedPageId: defaultScreenId,
    resizeElementId: null,
    selectedElements:[],
    onHold:false,
    clipboardElements:[],
    selectedElementInfo:null,
    fieldsCurrentScreen:[]
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
        case ADD_NEW_PAGE:
            return addNewPage(state)
            break;
        case SELECT_SCREEN:
            return {
                ...state,
                selectedPageId: action.screenId
            }
            break;
        case UPDATE_ELEMENT_PROP:
            return updateElementProp(state, action)
            break;
        case FETCH_FIELDS_SCREEN:
            return fetchFieldsInScreen(state)
            break;
        default:
            break;
    }

    return state
}