import { ADD_ELEMENT_TO_SCREEN, UPDATE_ELEMENT_POSITION, SET_RESIZE_STATE, CLEAR_RESIZE_STATE, UPDATE_BOX_HEIGHT, UPDATE_BOX_WIDTH } from '../commons/constants'
import _ from 'lodash'

export default function reducer(state={
    screenList:{1:[]},
    resizeElementId:null
}, action) {
    switch(action.type){
        case ADD_ELEMENT_TO_SCREEN:

            let screenListCopy = _.cloneDeep(state.screenList)
            screenListCopy[action.screenId].push(action.element)

            return {...state, screenList: screenListCopy}

          break;
        case UPDATE_ELEMENT_POSITION:

              let screenListCopy3 = _.cloneDeep(state.screenList)


              screenListCopy3[action.screenId] = screenListCopy3[action.screenId].map((element) => {
                  if(element.id === action.element.id){
                    element.top = action.element.top
                    element.left = action.element.left
                  }
                  return element
              })

              return {
                ...state,
                screenList: screenListCopy3
              }

            break;
        case UPDATE_BOX_HEIGHT:
            let screenListCopy2 = _.cloneDeep(state.screenList)

            screenListCopy2[action.screenId] = screenListCopy2[action.screenId].map((element) => {
                if(element.id === action.element.id){
                  element.height = action.element.height
                  if(action.element.delta > 0) {
                    element.top =   element.top - action.element.delta
                  } else {
                    element.top =   element.top + Math.abs(action.element.delta)
                  }
                  console.log('action.element', action.element)
                }
                return element
            })

            return {
              ...state,
              screenList: screenListCopy2
            }

            break;


        case UPDATE_BOX_WIDTH:
                let screenListCopy4 = _.cloneDeep(state.screenList)

                screenListCopy4[action.screenId] = screenListCopy4[action.screenId].map((element) => {
                    if(element.id === action.element.id){
                      element.width = action.element.width
                      
                      if(action.element.delta > 0) {
                        element.left =   element.left - action.element.delta
                      } else {
                        element.left =   element.left + Math.abs(action.element.delta)
                      }


                    }
                    return element
                })

                return {
                  ...state,
                  screenList: screenListCopy4
                }

                break;
        case SET_RESIZE_STATE:
            return {...state, resizeElementId: action.id}
            break;

        case CLEAR_RESIZE_STATE:
            return {...state, resizeElementId: null}
            break;

        default:
            break;
    }

    return state
}
