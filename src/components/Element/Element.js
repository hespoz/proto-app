import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../../commons/ItemTypes'
import {connect} from 'react-redux'
import uuidv4 from 'uuid/v4'

import '../../App.scss'
import './Element.scss'

import { setResizeState, clearResizeState, resizeElement } from '../../actions/canvasAction'

let element = null
let resizeHandle = null

const style = {}

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
		lastPositionX:0
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

        this.props.dispatch(resizeElement(1, this.props.id , e.clientY - element.offsetTop, this.props.width + (e.clientX - this.state.lastPositionX)))

		this.setState({
			lastPositionX: e.clientX
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
			children
		} = this.props


		const height = `${this.props.height}px`
        const width = `${this.props.width}px`


		if (isDragging && hideSourceOnDrag) {
			return null
		}

		
		return connectDragSource(

				<div id={`box-${this.state.id}`} className='element-wrapper' style={{ ...style, left, top, height, width}}>

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
