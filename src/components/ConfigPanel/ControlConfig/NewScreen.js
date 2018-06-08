import React, {Component} from 'react'
import { Form, Divider, Button, Icon, Header } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addNewPage} from "../../../actions/canvasAction";

@connect((store) => {
    return {
        toActionId:store.canvas.toActionId
    }
})
export default class NewScreen extends Component {

    state = {
        screenName:'',
        isValid:false
    }

    onScreenNameChange = (e, data) => {
        this.setState({
            screenName: e.target.value
        }, () => {
            this.setState({isValid: this.state.screenName !== ''})
        })
    }

    render() {
        return (
            <div className='content-container'>
                <header>
                    <div className='header'>
                        <div>
                            <Header as='h3'>New State</Header>
                        </div>
                        <div>
                            <Icon name='close' size='large' onClick={this.addCloseNewState}/>
                        </div>
                    </div>
                </header>
                <segment>
                    <Form>
                        <Form.Field>
                            <label>Screen name</label>
                            <input onChange={this.onScreenNameChange} value={this.state.screenName}/>
                        </Form.Field>
                        <Form.Field>
                            <Button fluid onClick={() => {
                                if(this.state.isValid){
                                    this.props.dispatch(addNewPage(this.props.toActionId, this.state.screenName))
                                }
                            }}>
                                New blank page
                            </Button>
                            <Divider horizontal>Or</Divider>
                            <Button fluid onClick={() => {
                                if(this.state.isValid) {
                                    this.props.dispatch(addNewPage(this.props.toActionId, this.state.screenName, true))
                                }
                            }}>
                                Clone current screen
                            </Button>
                        </Form.Field>
                    </Form>
                </segment>
            </div>
        )
    }

}