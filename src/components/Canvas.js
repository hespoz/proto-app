import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import {ItemTypes} from '../commons/ItemTypes'
import {connect} from 'react-redux'
import {findDOMNode} from 'react-dom'
import {addElementToScreen, updateElementPosition} from '../actions/canvasAction'
import ContentElement from '../commons/ContentElement/ContentElement'
import Element from './Element/Element'

const style = {
    border: '1px solid gray',
    height: '630px',
    width: '100%',
    padding: '2rem',
    textAlign: 'center',
    position: 'relative'
}

const elementTarget = {
    drop(props, monitor, component) {
        //Update item list.

        const item = monitor.getItem()
        console.log("Canvas", item)

        if (item.id !== undefined) {
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.left + delta.x)
            const top = Math.round(item.top + delta.y)
            props.dispatch(updateElementPosition(1, item.id, top, left))

        } else {

            const clientOffset = monitor.getClientOffset();
            //const clientOffset = monitor.getDifferenceFromInitialOffset()
            const componentRect = findDOMNode(component).getBoundingClientRect()

            const left = Math.round(clientOffset.x - componentRect.left);
            const top = Math.round(clientOffset.y - componentRect.top);

            props.dispatch(addElementToScreen(1, item.type, top, left))
        }


        return {}
    }
}


@connect((store) => {
    return {
        screenList: store.canvas.screenList
    }
})
@DropTarget(ItemTypes.ELEMENT, elementTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
}))
export default class TargetBox extends Component {

    render() {
        const {connectDropTarget} = this.props

        const {screenList} = this.props

        return connectDropTarget(
            <div id="canvasDrawer" style={style}>
                {screenList[1].map((item) => {
                    return (
                        <Element
                            key={item.id}
                            id={item.id}
                            left={item.left}
                            top={item.top}
                            height={item.height}
                            width={item.width}
                            hideSourceOnDrag
                        >
                            <ContentElement id={item.id} type={item.type} label={item.label} dropedElement/>
                        </Element>
                    )

                })}
            </div>,
        )
    }
}
