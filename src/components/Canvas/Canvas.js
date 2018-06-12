import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import {ItemTypes} from '../../commons/ItemTypes'
import {connect} from 'react-redux'
import {findDOMNode} from 'react-dom'

import {
    addElementToScreen,
    saveLastState,
    updateElementPosition,
    setHold,
    clearAllSelections,
    copy,
    paste,
    setScreenUpdatedToFalse
} from '../../actions/canvasAction'

import './Canvas.scss'

import Browser from '../../commons/Screens/Browser'
import _ from 'lodash'

let timerId = null

const timerUpdate = (fn) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
        fn
    },3000)
}


const elementTarget = {
    drop(props, monitor, component) {

        const item = monitor.getItem()

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
export default class TargetBox extends Component {

    state = {activeIndex: 1}

    componentDidMount = () => {

        document.onkeydown = (e) => {
            console.log(e.keyCode)
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

        //Save first state of the application
        this.props.dispatch(saveLastState({
            id: this.props.projectId,
            screenList: this.props.screenList
        }))


        //setScreenUpdatedToFalse

        /*setTimeout(() => {

        },3000)*/



    }

    componentDidUpdate = (props) => {
        if (this.props.screenUpdated) {
            this.props.dispatch(saveLastState({
                id: this.props.projectId,
                screenList: this.props.screenList
            }))
        }
    }

    timerUpdate = () => {
        clearTimeout(timerId)
        timerId = setTimeout(() => {
            this.props.dispatch(saveLastState({
                id: this.props.projectId,
                screenList: this.props.screenList
            }))
        },3000)
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
}
