import React, { Component } from 'react'
import { Accordion, Icon, Form } from 'semantic-ui-react'

export default class Events extends Component {

    state = {
        activeIndex: 0
    }

    handleClick = (e, titleProps) => {

        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { events } = this.props
        const { activeIndex } = this.state

         return (<Accordion>
            {events.map((event,index) =>{
                return (
                    <div>
                        <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick} >
                            <Icon name='dropdown' />
                            {event}
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === index}>

                        </Accordion.Content>
                    </div>
                )

            })}

        </Accordion>)

    }
}