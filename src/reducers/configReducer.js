import {
    FETCH_CONTROL_TEMPLATES
} from '../commons/constants'

export default function reducer(state = {
    controlTemplates: []
}, action) {
    switch (action.type) {
        case FETCH_CONTROL_TEMPLATES:
            return {
                ...state,
                controlTemplates: action.controlTemplates
            }
            break;
        default:
            break;
    }

    return state
}
