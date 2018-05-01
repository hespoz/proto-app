import React from 'react'
import { ControlType } from '../ControlType'

import './ContentElement.scss'


const renderElementByType = (type) => {
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
                <div className='center-content'>Button</div>
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

const ContentElement = (props) => {

    return (
        <div className='content-element'>
            {renderElementByType(props.type)}
        </div>
    )

}

export default ContentElement