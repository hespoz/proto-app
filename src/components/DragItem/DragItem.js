import React, { Component } from 'react'
import { ItemTypes } from '../../commons/ItemTypes'
import { DragSource } from 'react-dnd'
import ContentElement from '../ContentElement'
import './DragItem.scss'

const formItemSource = {
    beginDrag(props) {
        return {
            name: props.name
        }
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}


@DragSource(ItemTypes.ELEMENT, formItemSource, collect)
export default class DragItem extends Component {

    render() {

        const { connectDragSource, isDragging } = this.props;
        const dropEffect = 'copy'

        return connectDragSource(
            <div className='drag-item-container' style={{ opacity: isDragging ? 0.4 : 1}}>
                <ContentElement type={this.props.name} />
            </div>,
            { dropEffect }
        )

    }

}