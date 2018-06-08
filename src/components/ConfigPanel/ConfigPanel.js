import React, {Component} from 'react'
import {Accordion, Icon, Form, Button, Select} from 'semantic-ui-react'

import {
    TEXT_FIELD,
    TEXT_AREA,
    BUTTON
} from '../../commons/constants'

import {addNewPage, selectScreen, addNewAction} from '../../actions/canvasAction'

import './ConfigPanel.scss'
import {connect} from "react-redux";

import TextFieldConfig from './ControlConfig/TextFieldConfig'
import ButtonConfig from "./ControlConfig/ButtonConfig";

@connect((store) => {
    return {
        screenList: store.canvas.screenList,
        selectedPageId: store.canvas.selectedPageId,
        selectedElementInfo:store.canvas.selectedElementInfo
    }
})
export default class ConfigPanel extends Component {

    state = {
        activeIndex: 0,
        activeIndexScreen: -1
    }

    handleClick = (e, titleProps) => {
        const {index} = titleProps
        const {activeIndex} = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({activeIndex: newIndex})
    }

    handleClickScreen = (e, titleProps) => {
        const {index} = titleProps
        const {activeIndexScreen} = this.state
        const newIndex = activeIndexScreen === index ? -1 : index

        this.setState({activeIndexScreen: newIndex})
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

    renderControlProperties = () => {
        switch(this.props.selectedElementInfo.type){
            case TEXT_FIELD: case TEXT_AREA:
                return <TextFieldConfig/>
                break;
            case BUTTON:
                return <ButtonConfig/>
                break;
            default:
                return (
                    <h1>Otro</h1>
                )
                break;
        }
    }

    render() {

        const { activeIndex } = this.state

        const { selectedElementInfo } = this.props

        return (
            <div className='config-container'>

                <Button flat onClick={(e) => {
                    this.props.dispatch(addNewPage())
                }}>New page</Button>

                <Select placeholder='Select screen' options={this.getPageList()} onChange={(e, {value}) => {
                    this.props.dispatch(selectScreen(value))
                }}
                        value={this.props.selectedPageId}
                />

                {/*<Accordion>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown'/>
                        Screen
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <div className='content-container'>
                            <Form>
                                <Form.Field>
                                    <label>Screen Name</label>
                                    <input placeholder='Screen Name'/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Url</label>
                                    <input placeholder='Url'/>
                                </Form.Field>
                            </Form>


                            <Events events={[EventType.ON_LOAD]}/>

                        </div>
                    </Accordion.Content>


                </Accordion>*/}

                {selectedElementInfo !== null && selectedElementInfo !== undefined ?
                    (
                        <Accordion>

                            <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                                <Icon name='dropdown'/>
                                Control
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 1}>
                                <Button flat onClick={(e) => {
                                    this.props.dispatch(addNewAction())
                                }}>New Action</Button>

                                {this.renderControlProperties()}
                            </Accordion.Content>
                        </Accordion>
                    )
                    :
                    (
                        null
                    )
                }


            </div>
        )
    }
}