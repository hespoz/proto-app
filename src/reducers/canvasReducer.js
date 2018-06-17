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
    TEXT_AREA,
    SHOW_ADD_NEW_FORM,
    UPDATE_ACTION_ELEMENT_PROP,
    ADD_NEW_ACTION,
    SAVE_LAST_STATE,
    SET_SCREEN_UPDATED_TO_FALSE, GET_PROJECT_BY_ID
} from '../commons/constants'
import _ from 'lodash'

import uuidv4 from 'uuid/v4'

import { generateHelper, generateAction } from './generateHelper'

const getIndexByScreenId = (screenList, selectedPageId) => {
    return _.findIndex(screenList, (s) => {
        return s.id === selectedPageId
    })
}

const getLastSelectedElement = (state, selectedElementId) => {
    let screenListCopy = _.cloneDeep(state.screenList)
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    return _.find(screenListCopy[index].elements, (element) => {
        return element.id === selectedElementId
    })
}

const elementsOperation = (elements, selectedElementId, transformFn) => {
    return elements.map((element) => {
        if (element.id === selectedElementId) {
            element = transformFn !== undefined ? transformFn(element) : element
        }
        return element
    })
}

const updateProjectScreenList = (state, selectedElementId, fn) => {
    let screenListCopy = _.cloneDeep(state.screenList)
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)
    screenListCopy[index].elements = elementsOperation(state.screenList[index].elements, state.selectedElementInfo.id, fn)
    return screenListCopy
}


const addNewAction = (state) => {
    return {
        ...state,
        screenList: updateProjectScreenList(state, state.selectedElementInfo.id, (element) => {
            element.props.actions.push(generateAction())
            return element
        }),
        selectedElementInfo: getLastSelectedElement(state, state.selectedElementInfo.id),
        screenUpdated:true
    }
}

const resizeElement = (state, action) => {
    return {
        ...state,
        screenList: updateProjectScreenList(state, action.element.id, (element) => {
            element.height = action.element.height
            element.width = action.element.width
            return element
        }),
        screenUpdated:true
    }
}


const updateLabel = (state, action) => {
    return {
        ...state,
        screenList: updateProjectScreenList(state, action.element.id, (element) => {
            element.label = action.element.label
            return element
        }),
        screenUpdated:true
    }
}


const updateElementProp = (state, action) => {

    return {
        ...state,
        screenList: updateProjectScreenList(state, state.selectedElementInfo.id, (element) => {
            element.props[action.propName].value = action.value
            return element
        }),
        selectedElementInfo: getLastSelectedElement(state, state.selectedElementInfo.id),
        screenUpdated:true
    }

}


const updateActionElementProp = (state, action) => {
    return {
        ...state,
        screenList: updateProjectScreenList(state, state.selectedElementInfo.id, (element) => {
            element.props.actions = element.props.actions.map((actionElem) => {
                if(actionElem.id === action.actionId) {
                    actionElem[action.propName].value = action.value
                }
                return actionElem
            })
            return element
        }),
        selectedElementInfo: getLastSelectedElement(state, state.selectedElementInfo.id),
        screenUpdated:true
    }
}


const addElement = (state, action) => {
    const screenListCopy = _.cloneDeep(state.screenList)

    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = state.screenList[index]

    action.element.props = generateHelper(action.element.type, countFieldElements(state))

    screen.elements.push(action.element)

    screenListCopy[index] = screen

    return {
        ...state,
        screenList: screenListCopy,
        selectedElements: [action.element.id],
        selectedElementInfo: action.element,
        screenUpdated:true
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
        selectedElementInfo:null,
        screenUpdated:true
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
        selectedElementInfo = getLastSelectedElement(state, selectedElements[0])
    } else {
        selectedElementInfo = null
    }

    return {
        ...state,
        selectedElements: selectedElements,
        selectedElementInfo:selectedElementInfo,
        screenUpdated:true
    }
}

const copyToClipboard = (state) => {
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = state.screenList[index]

    let clipBoard = _.filter(screen.elements, (element) => {
        return _.find(state.selectedElements, (id) => {return id === element.id})
    })

    return {
        ...state,
        clipboardElements: clipBoard,
        screenUpdated:true
    }

}


const paste = (state) => {

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
            width: element.width + 20,
            props: element.props
        }
    })

    screen.elements = _.concat(screen.elements, newElements)

    screenListCopy[index] = screen

    return {
        ...state,
        screenList: screenListCopy,
        screenUpdated:true
    }

}


const updateElementPosition = (state, action) => {
    let screenListCopy = _.cloneDeep(state.screenList)
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = state.screenList[index]

    let selectedElementsCopy = _.cloneDeep(state.selectedElements)

    const singleMove = () => {

        selectedElementsCopy = []

        screenListCopy[index].elements = elementsOperation(state.screenList[index].elements, action.element.id, (element) => {
            element.top = Math.round(element.top + action.element.deltaY)
            element.left = Math.round(element.left + action.element.deltaX)
            return element
        })

    }

    const groupMove = () => {
        screenListCopy[index].elements = screen.elements.map((element) => {
            if (_.find(selectedElementsCopy, (id) => {return id === element.id}) !== undefined) {
                element.top = Math.round(element.top + action.element.deltaY)
                element.left = Math.round(element.left + action.element.deltaX)
            }
            return element
        })
    }

    //if id element is not in the selected. then remove all the previous selections and only move the drag element
    if (_.find(selectedElementsCopy, (id) => {return id === action.element.id}) === undefined) {
        singleMove()
    } else {
        groupMove()
    }

    return {
        ...state,
        screenList: screenListCopy,
        selectedElements:selectedElementsCopy,
        screenUpdated:true
    }
}

const countFieldElements = (state) => {
    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = state.screenList[index]

    let fieldElementsCount = 1
    _.forEach(screen.elements, (element) => {
        if(element.type === TEXT_FIELD || element.type === TEXT_AREA) {
            fieldElementsCount++
        }
    })

    return fieldElementsCount
}


const addNewPage = (state, action) => {

    let screenListCopy = _.cloneDeep(state.screenList)

    const index = getIndexByScreenId(state.screenList, state.selectedPageId)

    let screen = _.cloneDeep(state.screenList[index])

    const screenId = uuidv4()

    let newElements = []

    if (action.copyState) {
        newElements = screen.elements.map((elm) => {

            let elmCopy = _.cloneDeep(elm)

            elmCopy.props = generateHelper(elmCopy.type, countFieldElements(state))

            return elmCopy
        })
    }

    screenListCopy.push({
        id:screenId,
        name:action.screenName,
        elements:newElements
    })


    let selectedElementInfoCopy = _.cloneDeep(state.selectedElementInfo)
    screenListCopy[index].elements = screen.elements.map((element) => {
        if (element.id === selectedElementInfoCopy.id) {
            element.props.actions = element.props.actions.map((actionElem) => {
                if(actionElem.id === action.actionId) {
                    actionElem["goToState"].value = screenId
                }
                return actionElem
            })

            selectedElementInfoCopy = element

        }
        return element
    })


    return {
        ...state,
        screenList: screenListCopy,
        showNewScreenForm:false,
        selectedElementInfo: selectedElementInfoCopy,
        screenUpdated:true
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
        fieldsCurrentScreen: fieldOptions,
        screenUpdated:true
    }

}

const updateStateProject = (state, action) => {
    return {
        ...state,
        projectId: action.savedProject.projectId,
        screenList: action.savedProject.screenList,
        screenUpdated: false
    }
}

const defaultScreenId = uuidv4()

export default function reducer(state = {
    projectId:null,
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
    fieldsCurrentScreen:[],
    showNewScreenForm: false,
    toActionId:null,
    screenUpdated:false
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
            return copyToClipboard(state)
            break;
        case PASTE:
            return paste(state)
            break;
        case ADD_NEW_PAGE:
            return addNewPage(state, action)
            break;
        case SELECT_SCREEN:
            return {
                ...state,
                selectedPageId: action.screenId,
                selectedElementInfo:null
            }
            break;
        case UPDATE_ELEMENT_PROP:
            return updateElementProp(state, action)
            break;
        case UPDATE_ACTION_ELEMENT_PROP:
            return updateActionElementProp(state, action)
            break;
        case FETCH_FIELDS_SCREEN:
            return fetchFieldsInScreen(state)
            break;
        case SHOW_ADD_NEW_FORM:
            return {
                ...state,
                showNewScreenForm:true,
                toActionId:action.actionId
            }
        case ADD_NEW_ACTION:
            return addNewAction(state)
            break;
        case SAVE_LAST_STATE:
            return updateStateProject(state, action)
            break;
        case SET_SCREEN_UPDATED_TO_FALSE:
            return {
                ...state,
                screenUpdated:false
            }
        case GET_PROJECT_BY_ID:
            return {
                ...state,
                projectId: action.savedProject._id,
                screenList: action.savedProject.screenList,
                selectedPageId: action.savedProject.screenList[0].id
            }
            break;


        default:
            break;
    }

    return state
}