import uuidv4 from 'uuid/v4'
import { ADD_ELEMENT_TO_SCREEN, SET_RESIZE_STATE, CLEAR_RESIZE_STATE, UPDATE_ELEMENT_POSITION, RESIZE_ELEMENT } from '../commons/constants'

export function addElementToScreen(screenId, type, top, left){
    return function(dispatch) {
        dispatch({type:ADD_ELEMENT_TO_SCREEN, screenId:screenId, element:{
          id:uuidv4(),
          type:type,
          top: top,
          left: left,
          height:35,
          width:200
        }})
    }
}

export function updateElementPosition(screenId, id, top, left){
    return function(dispatch) {
        dispatch({type:UPDATE_ELEMENT_POSITION, screenId:screenId, element:{
                id:id,
                top: top,
                left: left
            }})
    }
}

export function setResizeState(id){
    return function(dispatch) {
        dispatch({type:SET_RESIZE_STATE, id:id})
    }
}

export function clearResizeState(){
    return function(dispatch) {
        dispatch({type:CLEAR_RESIZE_STATE, id:null})
    }
}


export function resizeElement(screenId, id, height, width){
    return function(dispatch) {
        dispatch({type:RESIZE_ELEMENT, screenId:screenId, element:{
                id:id,
                height:height,
                width:width
        }})
    }
}


