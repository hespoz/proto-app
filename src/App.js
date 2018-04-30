import React, {Component} from 'react'
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
                            <DragItem name="TexField" label="TextField"/>
                            <DragItem name="TextArea" label="Text Area"/>
                            <DragItem name="Label" label="Label"/>
                            <DragItem name="Button" label="Button"/>
                            <DragItem name="Checkbox" label="Checkbox"/>
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
