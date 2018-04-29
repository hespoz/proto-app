import React, { Component } from 'react'
import './App.scss'

import { default as TouchBackend } from 'react-dnd-touch-backend'
import { DragDropContext } from 'react-dnd'

import { Grid, Segment } from 'semantic-ui-react'

import FormItem from './FormItem'
import Canvas from './Canvas'

import HTML5Backend from 'react-dnd-html5-backend'

//@DragDropContext(TouchBackend({ enableMouseEvents: true }))
@DragDropContext(HTML5Backend)
export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <div className="palet-container">
              <FormItem name="TexField" label="TextField"/>
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
