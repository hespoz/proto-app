import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import {connect} from 'react-redux'
import { findDOMNode } from 'react-dom'
import { addElementToScreen, updateElementPosition } from './actions/canvasAction'
import Box from './Box'
import Resizable from 're-resizable'

const style = {
	border: '1px solid gray',
	height: '630px',
	width: '100%',
	padding: '2rem',
	textAlign: 'center',
  position:'relative'
}

const boxTarget = {
	drop(props, monitor, component) {
    //Update item list.

		const item = monitor.getItem()

			if(item.id !== undefined) {
				const item = monitor.getItem()
				const delta = monitor.getDifferenceFromInitialOffset()
				const left = Math.round(item.left + delta.x)
				const top = Math.round(item.top + delta.y)
				props.dispatch(updateElementPosition(1, item.id, top, left))
			} else {

				const clientOffset = monitor.getClientOffset();
				const componentRect = findDOMNode(component).getBoundingClientRect()

				const left = Math.round(clientOffset.x - componentRect.left);
				const top = Math.round(clientOffset.y - componentRect.top);

				props.dispatch(addElementToScreen(1, item.name, top, left))
			}


    return {}
  }
}

@connect((store) => {
    return {
      screenList:store.canvas.screenList
    }
})
@DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
}))
export default class TargetBox extends Component {

	render() {
		const { canDrop, isOver, connectDropTarget, itemType } = this.props
		const isActive = canDrop && isOver

    const {screenList} = this.props

		return connectDropTarget(
			<div id="canvasDrawer" style={style}>
				{screenList[1].map((item, index) => {
          return (
								<Box
									key={item.id}
									id={item.id}
									left={item.left}
									top={item.top}
									height={item.height}
									width={item.width}
									hideSourceOnDrag
								>
										Hola
								</Box>
          )

        })}
			</div>,
		)
	}
}
