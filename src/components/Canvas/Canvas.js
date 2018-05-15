import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import {ItemTypes} from '../../commons/ItemTypes'
import {connect} from 'react-redux'
import {findDOMNode} from 'react-dom'
import {addElementToScreen, updateElementPosition, setHold, clearAllSelections} from '../../actions/canvasAction'
import ContentElement from '../../commons/ContentElement/ContentElement'
import Element from '../Element/Element'
import './Canvas.scss'


const elementTarget = {
    drop(props, monitor, component) {
        //Update item list.

        const item = monitor.getItem()

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

const browser = (screen) => {
    return (
        <div id="canvasDrawer" className='browser'>
            <div className='nav-bar'>
                <div className='icon red'></div>
                <div className='icon yellow'></div>
                <div className='icon green'></div>
                <div className='url'></div>
            </div>
            <div>
                {screen.map((item) => {
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
            </div>
        </div>
    )
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

    componentDidMount = () => {

        document.onkeydown= (e) => {
            if(e.keyCode === 91 || e.keyCode === 17) {
                this.props.dispatch(setHold(true))
            }
        }

        document.onkeyup= (e) => {
            this.props.dispatch(setHold(false))
        }

    }

    clearSelection = (e) => {
        if(e.target.id === 'canvasDrawer') {
            this.props.dispatch(clearAllSelections())
        }
    }

    render() {
        const {connectDropTarget} = this.props

        const {screenList} = this.props

        return connectDropTarget(
            <div onClick={this.clearSelection}>
                {browser(screenList[1])}
            </div>,
        )
    }
}
