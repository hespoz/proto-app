import React, {Component} from 'react'
import {ControlType} from './commons/ControlType'
import './App.scss'

import {DragDropContext} from 'react-dnd'

import DragItem from './components/DragItem/DragItem'
import Canvas from './components/Canvas/Canvas'
import ConfigPanel from './components/ConfigPanel/ConfigPanel'

import HTML5Backend from 'react-dnd-html5-backend'
import PageList from "./components/PageList/PageList";

@DragDropContext(HTML5Backend)
export default class App extends Component {
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
                        <Canvas/>
                    </div>

                    <div className="right-panel">
                        <ConfigPanel/>
                    </div>

                </div>
            </div>
        );
    }
}
