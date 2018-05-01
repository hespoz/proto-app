import React, {Component} from 'react'
import {ControlType} from './commons/ControlType'
import './App.scss'

import {DragDropContext} from 'react-dnd'

import DragItem from './components/DragItem/DragItem'
import Canvas from './components/Canvas'

import HTML5Backend from 'react-dnd-html5-backend'

@DragDropContext(HTML5Backend)
export default class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row main-container">
                    <div className="col-3">
                        <div className="palet-container">
                            <DragItem type={ControlType.TEXT_FIELD}/>
                            <DragItem type={ControlType.TEXT_AREA}/>
                            <DragItem type={ControlType.LABEL}/>
                            <DragItem type={ControlType.BUTTON}/>
                            <DragItem type={ControlType.CHECKBOX}/>
                            <DragItem type={ControlType.OPTION}/>
                        </div>
                    </div>
                    <div className="col-9">
                        <Canvas/>
                    </div>
                </div>
            </div>
        );
    }
}
