import React, { Component } from 'react'
import { ItemTypes } from './ItemTypes'
import { DragSource } from 'react-dnd'
import { addElementToScreen } from './actions/canvasAction'
import {connect} from 'react-redux'
import { findDOMNode } from 'react-dom'

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1rem',
	marginBottom: '1rem',
	cursor: 'move',
}

const formItemSource = {
  beginDrag(props) {
		return {
			name: props.name
		}
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@connect((store) => {
    return {}
})
@DragSource(ItemTypes.BOX, formItemSource, collect)
export default class FormItem extends Component {

  render() {
      const { connectDragSource, isDragging } = this.props;
      const opacity = isDragging ? 0.4 : 1
      const dropEffect = 'copy'
      return connectDragSource(
        <div style={{ ...style, opacity }}>
          {this.props.label}
        </div>,
        { dropEffect },
      )

  }

}
