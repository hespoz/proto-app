import React, {Component} from 'react'
import {connect} from 'react-redux'
import { ControlType } from '../ControlType'

import {updateLabel} from '../../actions/canvasAction'


import './ContentElement.scss'


const renderElementByType = (type, dropedElement, onDoubleClickHandler, edit, label, keyPressHandler, inputChangeHandler) => {
    switch(type){
        case ControlType.TEXT_FIELD:
            return (<div className='text-element field'>Text field</div>)
            break;
        case ControlType.TEXT_AREA:
            return (<div className='text-element area'>Text Area</div>)
            break;
        case ControlType.LABEL:
            return (<div className='center-content'>Label</div>)
            break;
        case ControlType.BUTTON:
            return (
                <div className='center-content'>
                    {!edit ?
                        (
                            <div className={dropedElement ? 'content' : ''} onDoubleClick={dropedElement ? onDoubleClickHandler : null}>
                                {label}
                            </div>
                        )
                        :
                        (
                            <div>
                                <input type='text' onKeyPress={keyPressHandler} onChange={inputChangeHandler} value={label}/>
                            </div>
                        )
                    }


                </div>
            )
            break;
        case ControlType.CHECKBOX:
            return (
                <div className='select-content'>
                    <div className='left'>
                        <div className='square'></div>
                    </div>
                    <div className='right'>Checkbox</div>
                </div>
            )
            break;
        case ControlType.OPTION:
            return (
                <div className='select-content'>
                    <div className='left'>
                        <div className='circle'></div>
                    </div>
                    <div className='right'>Option</div>
                </div>
            )
            break;
        default:
            return null
            break;
    }
}

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

    render() {
        return (
            <div className='content-element'>
                {renderElementByType(this.props.type, this.props.dropedElement, this.onDoubleClickHandler, this.state.edit, this.state.label, this.keyPressHandler, this.inputChangeHandler)}
            </div>
        )
    }
}