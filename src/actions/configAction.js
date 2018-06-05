import {
    FETCH_CONTROL_TEMPLATES, SELECT_SCREEN
} from '../commons/constants'



export function fetchControlTemplates() {
    return function (dispatch) {
        dispatch({
            type: FETCH_CONTROL_TEMPLATES, controlTemplates: [
                {
                    type: "BUTTON",
                    events:[
                        {
                            type:"ON_CLICK",
                            display_name: "On Click",
                            validationRules:[],
                            actions:[]
                        }
                    ]
                },
                {
                    type: "CHECKBOX",
                    events:[
                        {
                            type:"ON_CLICK",
                            display_name: "On Click",
                            actions:[]
                        }
                    ]
                },
                {
                    type: "TEXTFIELD",
                    properties: [
                        {
                            name:"id"
                        }
                    ]
                },
                {
                    type: "TEXTAREA",
                    properties: [
                        {
                            name:"id"
                        }
                    ]
                },
                {
                    type: "TEXTFIELD",
                    properties: [
                        {
                            name:"id"
                        }
                    ]
                }
            ]
        })
    }
}
