import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import {ItemTypes} from '../../commons/ItemTypes'
import {connect} from 'react-redux'
import {findDOMNode} from 'react-dom'
import { withRouter } from 'react-router'

import {
    addElementToScreen,
    updateElementPosition,
    setHold,
    clearAllSelections,
    copy,
    paste
} from '../../actions/canvasAction'



import './Canvas.scss'

import Browser from '../Screens/Browser'
import _ from 'lodash'


const elementTarget = {
    drop(props, monitor, component) {

        const item = monitor.getItem()

        console.log("rapido", item)

        if (item.id !== undefined) {
            const delta = monitor.getDifferenceFromInitialOffset()
            props.dispatch(updateElementPosition(item.id, delta.x, delta.y))
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
        projectId: store.canvas.projectId,
        screenList: store.canvas.screenList,
        selectedPageId: store.canvas.selectedPageId,
        screenUpdated: store.canvas.screenUpdated
    }
})
@DropTarget(ItemTypes.ELEMENT, elementTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
}))
export default withRouter(class TargetBox extends Component {

    state = {activeIndex: 1}

    componentDidMount = () => {

        document.onkeydown = (e) => {
            if (e.keyCode === 91 || e.keyCode === 17) {
                this.props.dispatch(setHold(true))
            } else if (e.keyCode === 67) {
                this.props.dispatch(copy(1))
            } else if (e.keyCode === 86) {
                this.props.dispatch(paste(1))
            }
        }

        document.onkeyup = (e) => {
            this.props.dispatch(setHold(false))
        }

    }


    clearSelection = (e) => {
        if (e.target.id === 'canvasDrawer') {
            this.props.dispatch(clearAllSelections())
        }
    }

    getSelectedScreen = () => {


        let screenListCopy = _.cloneDeep(this.props.screenList)

        const index = _.findIndex(screenListCopy, (s) => {
            return s.id === this.props.selectedPageId
        })

        return screenListCopy[index]

    }

    render() {
        const {connectDropTarget} = this.props


        return connectDropTarget(
            <div onClick={this.clearSelection}>
                <Browser screen={this.getSelectedScreen()}/>
            </div>,
        )
    }
})
