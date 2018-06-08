import React, {Component} from 'react'
import {connect} from "react-redux"

import { Form, Select, TextArea, Divider, Button, Icon, Header } from 'semantic-ui-react'
import { updateElementProp, fetchFieldsInScreen, showAddNewForm } from "../../../actions/canvasAction";

import './ControlConfig.scss'
import NewScreen from "./NewScreen";

const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
]



@connect((store) => {
    return {
        screenList: store.canvas.screenList,
        selectedElementInfo:store.canvas.selectedElementInfo,
        fieldsCurrentScreen:store.canvas.fieldsCurrentScreen,
        showNewScreenForm: store.canvas.showNewScreenForm
    }
})
export default class ButtonConfig extends Component {

    componentDidMount = () => {
        this.props.dispatch(fetchFieldsInScreen())
    }

    getPageList = () => {
        return this.props.screenList.map((screen) => {
            return {
                key: screen.id,
                value: screen.id,
                text: screen.name
            }
        })
    }

    addCloseNewState = ()  => {
        this.setState({showAddNewState: false})
    }

    addNewState = ()  => {
        this.props.dispatch(showAddNewForm())
    }

    render() {
        const { selectedElementInfo, showNewScreenForm } = this.props

        if(showNewScreenForm){
            return <NewScreen/>
        } else {
            return (
                <div className='content-container'>
                    <Form>
                        <Form.Field>
                            <label>{selectedElementInfo.props.goToState.label}</label>
                            <Select
                                options={this.getPageList()}
                                value={selectedElementInfo.props.goToState.value}
                                onChange={(e, {value}) => {
                                    this.props.dispatch(updateElementProp("goToState", value))
                                }}
                            />

                            <Divider horizontal>Or</Divider>

                            <Button fluid onClick={this.addNewState}>
                                New state
                            </Button>

                        </Form.Field>
                        <Form.Field>
                            <label>{selectedElementInfo.props.actionName.label}</label>
                            <input onChange={(e, data) => {
                                this.props.dispatch(updateElementProp("actionName", e.target.value))
                            }}
                                   value={selectedElementInfo.props.actionName.value}/>
                        </Form.Field>
                        <Form.Field>
                            <label>{selectedElementInfo.props.actionDescription.label}</label>
                            <TextArea
                                onChange={(e, data) => {
                                    this.props.dispatch(updateElementProp("actionDescription", e.target.value))
                                }}
                                style={{ minHeight: 100 }}
                                value={selectedElementInfo.props.actionDescription.value}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>{selectedElementInfo.props.actionParameters.label}</label>
                            <Select
                                options={this.props.fieldsCurrentScreen}
                                value={selectedElementInfo.props.actionParameters.value}
                                multiple
                                onChange={(e, data) => {
                                    console.log(e.target.value, data)
                                    this.props.dispatch(updateElementProp("actionParameters", data.value))
                                }}
                            />
                        </Form.Field>
                    </Form>
                </div>
            )
        }

    }

}

