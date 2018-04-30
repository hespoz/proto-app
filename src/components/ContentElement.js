import React from 'react'

import './ContentElement.scss'
const ContentElement = (props) => {

    return (
        <div className='content-element'>
            {props.type}
        </div>
    )
}

export default ContentElement