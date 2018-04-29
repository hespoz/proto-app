import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import {connect} from 'react-redux'
import uuidv4 from 'uuid/v4'

import './App.scss'
//setResizeState(screenId, id, allowState)
import { setResizeState, clearResizeState, updateHeight, updateElementPosition, updateWidth } from './actions/canvasAction'

let box = document.getElementById('box')
let canvasDrawer = null
let resizeHandle = null

const style = {
	position: 'absolute',
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	cursor: 'move',
}

const boxSource = {
	canDrag(props, monitor) {
		console.log('canDrag', props.resizeElementId, props.id)
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
@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
export default class Box extends Component {

	state = {
		showResizable: false,
		allowDrag:true,
		mouseDown:false,
		position:-6,
		lastPositionY:0,
		lastPositionX:0,
		topHeight:10,
		height:45,
		width:85,
		id:uuidv4()
	}

	setEvents = (initialPositionX) => {

        this.setState({
            lastPositionX:initialPositionX
        }, () => {
            box = document.getElementById(`box-${this.state.id}`)
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
			height:e.clientY - box.offsetTop
		})
	}

	 stopResizing = (e) => {
		 window.removeEventListener('mousemove', this.startResizing, false);
		 window.removeEventListener('mouseup', this.stopResizing, false);
		 console.log('stop')
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
