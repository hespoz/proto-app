import React, {Component} from 'react'
import {connect} from "react-redux"

import {Form, Select, TextArea, Divider, Button, Icon, Accordion} from 'semantic-ui-react'
import {updateElementProp, fetchFieldsInScreen, showAddNewForm, updateActionElementProp} from "../../../actions/canvasAction";

import './ControlConfig.scss'
import NewScreen from "./NewScreen";



@connect((store) => {
    return {
        screenList: store.canvas.screenList,
        selectedElementInfo: store.canvas.selectedElementInfo,
        fieldsCurrentScreen: store.canvas.fieldsCurrentScreen,
        showNewScreenForm: store.canvas.showNewScreenForm
    }
})
export default class ButtonConfig extends Component {

    state = {
        activeIndex: -1
    }

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

    addCloseNewState = () => {
        this.setState({showAddNewState: false})
    }

    addNewState = (actionId) => {
        this.props.dispatch(showAddNewForm(actionId))
    }

    handleActionsToggle = (index) => {
        this.setState({activeIndex: index})
    }

    render() {
        const {selectedElementInfo, showNewScreenForm} = this.props

        if (showNewScreenForm) {
            return <NewScreen/>
        } else {
            return (
                <div className='content-container'>


                    <Accordion>

                        {selectedElementInfo.props.actions.map((action,index) => {
                            return (
                                <div>
                                    <Accordion.Title active={this.state.activeIndex === action.id} index={1} onClick={() => {
                                        this.handleActionsToggle(action.id)
                                    }}>
                                        <Icon name='dropdown'/>
                                        Action {index + 1}
                                    </Accordion.Title>
                                    <Accordion.Content active={this.state.activeIndex === action.id}>
                                        <Form>
                                            <Form.Field>
                                                <label>{action.goToState.label}</label>
                                                <Select
                                                    options={this.getPageList()}
                                                    value={action.goToState.value}
                                                    onChange={(e, {value}) => {
                                                        this.props.dispatch(updateActionElementProp(action.id, "goToState", value))
                                                    }}
                                                />

                                                <Divider horizontal>Or</Divider>

                                                <Button fluid onClick={() => {
                                                    this.addNewState(action.id)
                                                }}>
                                                    New state
                                                </Button>

                                            </Form.Field>
                                            <Form.Field>
                                                <label>{action.actionName.label}</label>
                                                <input onChange={(e, data) => {
                                                    this.props.dispatch(updateActionElementProp(action.id, "actionName", e.target.value))
                                                }}
                                                       value={action.actionName.value}/>
                                            </Form.Field>
                                            <Form.Field>
                                                <label>{action.actionDescription.label}</label>
                                                <TextArea
                                                    onChange={(e, data) => {
                                                        this.props.dispatch(updateActionElementProp(action.id, "actionDescription", e.target.value))
                                                    }}
                                                    style={{minHeight: 100}}
                                                    value={action.actionDescription.value}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <label>{action.actionParameters.label}</label>
                                                <Select
                                                    options={this.props.fieldsCurrentScreen}
                                                    value={action.actionParameters.value}
                                                    multiple
                                                    onChange={(e, data) => {
                                                        console.log(e.target.value, data)
                                                        this.props.dispatch(updateActionElementProp(action.id, "actionParameters", data.value))
                                                    }}
                                                />
                                            </Form.Field>
                                        </Form>
                                    </Accordion.Content>
                                </div>

                            )
                        })}

                    </Accordion>


                </div>
            )
        }

    }

}

