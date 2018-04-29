import uuidv4 from 'uuid/v4'
import { ADD_ELEMENT_TO_SCREEN, UPDATE_ELEMENT_POSITION, SET_RESIZE_STATE, CLEAR_RESIZE_STATE, UPDATE_BOX_HEIGHT, UPDATE_BOX_WIDTH } from '../constants'

export function addElementToScreen(screenId, type, top, left){
    return function(dispatch) {
        dispatch({type:ADD_ELEMENT_TO_SCREEN, screenId:screenId, element:{
          id:uuidv4(),
          type:type,
          top: top,
          left: left,
          height:'35px',
          width:'75px'
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

export function updateHeight(screenId, id, height, delta){
    return function(dispatch) {
        dispatch({type:UPDATE_BOX_HEIGHT, screenId:screenId, element:{
          id:id,
          height: height,
          delta:delta
        }})
    }
}

export function updateWidth(screenId, id, width, delta){
    return function(dispatch) {
        dispatch({type:UPDATE_BOX_WIDTH, screenId:screenId, element:{
          id:id,
          width: width,
          delta:delta
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
