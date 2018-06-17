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

import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/lib/HTML5toTouch'


@connect((store) => {
    return {
        screenUpdated: store.canvas.screenUpdated
    }
})
@DragDropContext(MultiBackend(HTML5toTouch))
export default withRouter(class App extends Component {
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
