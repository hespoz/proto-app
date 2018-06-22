import { MOVE_TO_STATE} from '../commons/constants'

export function moveToState(screenId) {
    return async (dispatch) => {

        dispatch({
            type: MOVE_TO_STATE,
            toScreen: screenId
        })

    }
}