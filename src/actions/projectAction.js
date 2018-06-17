import {
    CREATE_NEW_PROJECT,
    GET_PROJECT_BY_ID
} from '../commons/constants'

import uuidv4 from 'uuid/v4'

import axios from 'axios'

const hostUrl = process.env.API_HOST || 'http://localhost:9000'


export function createNewProject(project) {
    return async (dispatch) => {

        const savedProject = await axios.post(`${hostUrl}/save`, project, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        dispatch({
            type: CREATE_NEW_PROJECT,
            projectId: savedProject.data._id,
            projectCreated: true
        })

    }
}


export function getProjectById(projectId) {
    return async (dispatch) => {

        const savedProject = await axios.get(`${hostUrl}/app/${projectId}`)


        dispatch({
            type: GET_PROJECT_BY_ID,
            savedProject: savedProject.data
        })

    }
}