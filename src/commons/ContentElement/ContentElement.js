import React, {Component} from 'react'
import {connect} from 'react-redux'
import { ControlType } from '../ControlType'

import {updateLabel} from '../../actions/canvasAction'


import './ContentElement.scss'

//If we have the flag droped element, we bind events for edit.
@connect((store) => {
    return {

    }
})
export default class ContentElement extends Component {

    state = {
        edit:false,
        label:this.props.label
    }

    onDoubleClickHandler = () => {
        this.setState({edit: true})
    }

    inputChangeHandler = (e) => {
        this.setState({label:e.target.value})
    }

    keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            this.setState({edit: false}, () => {
                this.props.dispatch(updateLabel(1, this.props.id, this.state.label))
            })
        }
    }

    onSaveHandler = (e) => {
        this.setState({edit: false}, () => {
            this.props.dispatch(updateLabel(1, this.props.id, this.state.label))
        })
    }

    renderWrapperClass = () => {
        const { type } = this.props
        if(type === ControlType.TEXT_FIELD) {
            return (<div className='text-element field'>

                {this.renderEditable()}

            </div>)
        } else if(type === ControlType.TEXT_AREA) {
            return (<div className='text-element area'>

                {this.renderEditable()}

            </div>)
        } else if(type === ControlType.LABEL || type === ControlType.BUTTON) {
            return (
                <div className='center-content'>

                    {this.renderEditable()}

                </div>
            )
        } else if(type === ControlType.CHECKBOX || type === ControlType.OPTION) {
            return (
                <div className='select-content'>
                    <div className='left'>
                        <div className={type === ControlType.CHECKBOX ? 'square' : 'circle'}></div>
                    </div>
                    <div className='right'>
                        {this.renderEditable()}
                    </div>
                </div>
            )
        }
    }

    renderEditable = () => {

        const label = (
            <div className={this.props.dropedElement ? 'content' : ''} onDoubleClick={this.props.dropedElement ? this.onDoubleClickHandler : null}>
                {this.state.label}
            </div>
        )

        const editArea = this.props.type !== ControlType.TEXT_AREA ?
            (
                <div>
                    <input type='text' onKeyPress={this.keyPressHandler} onChange={this.inputChangeHandler} value={this.state.label}/>
                </div>
            )
            :
            (
                <div className='edit'>
                    <div className='text-wrapper'>
                        <textarea  cols="25" onChange={this.inputChangeHandler}>
                            {this.state.label}
                        </textarea>
                    </div>
                    <div>
                        <button onClick={this.onSaveHandler}>Save</button>
                    </div>
                </div>
            )

        return !this.state.edit ? label : editArea
    }

    render() {
        return (
            <div className='content-element'>
                {this.renderWrapperClass()}
            </div>
        )
    }
}