import React, {Component} from 'react'
import {ControlType} from './commons/ControlType'
import './App.scss'

import {DragDropContext} from 'react-dnd'

import DragItem from './components/DragItem/DragItem'
import Canvas from './components/Canvas/Canvas'
import ConfigPanel from './components/ConfigPanel/ConfigPanel'

import {Label} from 'semantic-ui-react'

import {connect} from 'react-redux'

import { Button } from 'semantic-ui-react'
import { withRouter } from 'react-router'

import MultiBackend from 'react-dnd-multi-backend'
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'
import {getProjectById} from './actions/projectAction'
import {saveLastState} from './actions/canvasAction'


@connect((store) => {
    return {
        screenUpdated: store.canvas.screenUpdated,
        screenList: store.canvas.screenList,
    }
})
@DragDropContext(MultiBackend(HTML5toTouch))
export default withRouter(class App extends Component {

    componentDidMount = () => {

        //Save first state of the application
        const {match} = this.props

        if(match.params.id) {
            this.props.dispatch(getProjectById(match.params.id))
        }

        setInterval(() => {
            if (this.props.screenUpdated) {
                this.props.dispatch(saveLastState({
                    id: match.params.id,
                    screenList: this.props.screenList
                }))
            }
        },5000)

    }

    render() {
        return (
            <div className="container-fluid">
                <h3 className="title">Form creator</h3>

                <div className=" main-container">
                    <div className="left-panel">
                        <div className="palet-container">
                            <h3>Draggable elements</h3>
                            <DragItem type={ControlType.TEXT_FIELD}/>
                            <DragItem type={ControlType.TEXT_AREA}/>
                            <DragItem type={ControlType.LABEL}/>
                            <DragItem type={ControlType.BUTTON}/>
                            <DragItem type={ControlType.CHECKBOX}/>
                            <DragItem type={ControlType.OPTION}/>
                        </div>
                    </div>
                    <div className="center-panel">

                        {!this.props.screenUpdated ?
                            (
                                <Label color={'green'} key={'green'}>
                                    Saved
                                </Label>
                            )
                            :
                            (
                                <Label color={'grey'} key={'grey'}>
                                    Pending
                                </Label>
                            )
                        }

                        <Button onClick={() => {
                            this.props.history.push(`/run/${this.props.match.params.id}`)
                        }}>Preview</Button>

                        <Canvas/>
                    </div>

                    <div className="right-panel">
                        <ConfigPanel/>
                    </div>

                </div>
            </div>
        );
    }


})
