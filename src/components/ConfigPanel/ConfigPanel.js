import React, { Component } from 'react'
import { Accordion, Icon, Form } from 'semantic-ui-react'
import {EventType} from '../../commons/EventType'
import Events from './Events'

import './ConfigPanel.scss'

export default class ConfigPanel extends Component {

    state = {
        activeIndex: 0,
        activeIndexScreen: -1
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    handleClickScreen = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndexScreen } = this.state
        const newIndex = activeIndexScreen === index ? -1 : index

        this.setState({ activeIndexScreen: newIndex })
    }


    render() {

        const { activeIndex, activeIndexScreen } = this.state

        return (
            <div className='config-container'>
                <Accordion>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick} >
                        <Icon name='dropdown' />
                        Screen
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <div className='content-container'>
                            <Form>
                                <Form.Field>
                                    <label>Screen Name</label>
                                    <input placeholder='Screen Name' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Url</label>
                                    <input placeholder='Url' />
                                </Form.Field>
                            </Form>


                            <Events events={[EventType.ON_LOAD]}/>

                        </div>
                    </Accordion.Content>

                    <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Control
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 1}>
                        <div className='content-container'>
                            Content to positionate
                        </div>
                    </Accordion.Content>

                </Accordion>
            </div>
        )
    }
}