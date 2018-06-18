import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {DragSource} from 'react-dnd'
import {ItemTypes} from '../../commons/ItemTypes'
import {connect} from 'react-redux'
import uuidv4 from 'uuid/v4'

import _ from 'lodash'

import '../../App.scss'
import './Element.scss'

import {setResizeState, clearResizeState, resizeElement, selectElement, removeElement} from '../../actions/canvasAction'
import RunElement from "./RunElement";

let element = null
let resizeHandle = null

const style = {

}

const elementSource = {
    canDrag(props, monitor) {
        return props.resizeElementId !== props.id
    },
    beginDrag(props) {
        const {id, left, top, height, width} = props
        return {id, left, top, height, width}
    }
}

@connect((store) => {
    return {
        resizeElementId: store.canvas.resizeElementId,
        selectedElements: store.canvas.selectedElements,
        onHold: store.canvas.onHold
    }
})
@DragSource(ItemTypes.ELEMENT, elementSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
}))
export default class Element extends Component {

    state = {
        id: uuidv4(),
        lastPositionX: 0
    }

    setEvents = (initialPositionX,initialPositionY) => {

        this.setState({
            lastPositionX: initialPositionX,
            lastPositionY: initialPositionY
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

        this.props.dispatch(resizeElement(1, this.props.id, this.props.height + (e.clientY - this.state.lastPositionY), this.props.width + (e.clientX - this.state.lastPositionX)))

        this.setState({
            lastPositionX: e.clientX,
            lastPositionY: e.clientY,
        })
    }

    stopResizing = (e) => {
        window.removeEventListener('mousemove', this.startResizing, false);
        window.removeEventListener('mouseup', this.stopResizing, false);
        this.props.dispatch(clearResizeState())
    }

    isElementSelected = () => {
        return _.findIndex(this.props.selectedElements, (o) => { return o == this.props.id }) !== -1
    }

    selectElement = () => {
        this.props.dispatch(selectElement(1, this.props.id, this.props.onHold))
    }

    render() {

        const {
            hideSourceOnDrag,
            connectDragSource,
            isDragging
        } = this.props


        const left = this.props.left
        const top = this.props.top
        const height = `${this.props.height}px`
        const width = `${this.props.width}px`


        if (isDragging && hideSourceOnDrag) {
            return null
        }

        return connectDragSource(
            <div id={`box-${this.state.id}`} className={`element-wrapper ${this.isElementSelected() ? 'selected' : ''}`} style={{...style, left, top, height, width }} onClick={this.selectElement}>

                <div id={`remove-${this.state.id}`} className='remove-btn'  style={!this.isElementSelected() ? { display:'none' } : {}} onClick={(e) => this.props.dispatch(removeElement(1, this.props.id))}>
                    x
                </div>

                <div id={`handle-${this.state.id}`} className='resize' style={!this.isElementSelected() ? { display:'none' } : {}} onMouseEnter={(e) => {
                    console.log(e.clientX)
                    this.setEvents(e.clientX, e.clientY)
                }}
                ></div>

                {this.props.children}

            </div>,
        )
    }
}


Element.propTypes = {
    key: PropTypes.number,
    item: PropTypes.shape({
        id: PropTypes.string,
        left: PropTypes.number,
        top: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number
    }),
    hideSourceOnDrag:PropTypes.bool
}