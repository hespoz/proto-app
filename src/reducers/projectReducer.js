import {
    CREATE_NEW_PROJECT
} from "../commons/constants";

export default function reducer(state = {
    projectId:null,
    projectCreated:false
}, action) {
    switch (action.type) {
        case CREATE_NEW_PROJECT:
            return {
                ...state,
                projectId:action.projectId,
                projectCreated:action.projectCreated
            }
            break;
        default:
            break;
    }

    return state
}