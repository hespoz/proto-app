import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../commons/ItemTypes'
import {connect} from 'react-redux'
import uuidv4 from 'uuid/v4'

import '../App.scss'

import { setResizeState, clearResizeState } from '../actions/canvasAction'

let element = null
let resizeHandle = null

const style = {
	position: 'absolute',
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

const elementSource = {
	canDrag(props, monitor) {
		return props.resizeElementId !== props.id
	},
	beginDrag(props) {
		const { id, left, top, height, width } = props
		return { id, left, top, height, width }
	}
}

@connect((store) => {
    return {resizeElementId:store.canvas.resizeElementId}
})
@DragSource(ItemTypes.ELEMENT, elementSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))
export default class Element extends Component {

	state = {
        id:uuidv4(),
		lastPositionX:0,
		height:45,
		width:85
	}

	setEvents = (initialPositionX) => {

        this.setState({
            lastPositionX:initialPositionX
        }, () => {
            element = document.getElementById(`box-${this.state.id}`)
            resizeHandle = document.getElementById(`handle-${this.state.id}`)
            resizeHandle.addEventListener('mousedown', this.initialiseResize, false);
		})

	}

	initialiseResize = (e) => {
		window.addEventListener('mousemove', this.startResizing, false);
		window.addEventListener('mouseup', this.stopResizing, false);
	}

	startResizing = (e) => {
        this.props.dispatch(setResizeState(this.props.id))
		this.setState({
			width: this.state.width + (e.clientX - this.state.lastPositionX),
			lastPositionX: e.clientX,
			height:e.clientY - element.offsetTop
		})
	}

	 stopResizing = (e) => {
		 window.removeEventListener('mousemove', this.startResizing, false);
		 window.removeEventListener('mouseup', this.stopResizing, false);
		 this.props.dispatch(clearResizeState())
	 }


	render() {

		const {
			hideSourceOnDrag,
			left,
			top,
			connectDragSource,
			isDragging,
			children,
		} = this.props

		const {
			height,
			width
		} = this.state

		if (isDragging && hideSourceOnDrag) {
			return null
		}

		
		return connectDragSource(

				<div id={`box-${this.state.id}`} style={{ ...style, left, top, height, width}}>

					<div id={`handle-${this.state.id}`}  className="resize" onMouseEnter={(e) => {
						this.setEvents(e.clientX)
					}}
					>
    				</div>

					{children}
				</div>,
		)
	}
}
