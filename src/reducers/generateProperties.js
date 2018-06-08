import {
    TEXT_FIELD,
    TEXT_AREA,
    BUTTON,
} from '../commons/constants'

import uuidv4 from 'uuid/v4'

const generateProperties = (type, index) => {
    switch(type) {
        case TEXT_FIELD: case TEXT_AREA:
        return {
            name : {
                label:"Name",
                value: type === TEXT_FIELD ? `TextField${index}`: `TextArea${index}`
            },
            fieldType : {
                label:"Field type",
                value:"SELECT_OPTION",
                options:[
                    {
                        key: "SELECT_OPTION",
                        value: "SELECT_OPTION",
                        text: "Select option"
                    },
                    {
                        key: "NOT_EMPTY",
                        value: "NOT_EMPTY",
                        text: "Not empty"
                    },
                    {
                        key: "EMAIL",
                        value: "EMAIL",
                        text: "Email"
                    },
                    {
                        key: "PASSWORD",
                        value: "PASSWORD",
                        text: "Password"
                    },
                    {
                        key: "NUMERIC",
                        value: "NUMERIC",
                        text: "Numeric"
                    },
                    {
                        key: "DATE",
                        value: "DATE",
                        text: "Date"
                    },
                    {
                        key: "DATETIME",
                        value: "DATETIME",
                        text: "Date time"
                    },
                    {
                        key: "TIME",
                        value: "TIME",
                        text: "Time"
                    }
                ]
            }
        }

        break;
        case BUTTON:
            return {

                actions:[{
                    id:uuidv4(),
                    actionName:{
                        label:"Action name",
                        value:"",
                    },
                    actionDescription:{
                        label:"Action description",
                        value:"",
                    },
                    actionParameters:{
                        label:"Action parameters",
                        value:[],
                    },
                    goToState:{
                        label:"Go to state",
                        value:-1,
                    }
                }]

            }
            break;
        default:
            return []
            break;
    }
}

export default generateProperties