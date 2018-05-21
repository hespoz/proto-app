import React from 'react'
import ContentElement from '../../commons/ContentElement/ContentElement'
import Element from '../../components/Element/Element'

const Browser = (props) => {
    return (
        <div id="canvasDrawer" className={`browser ${props.thubnail ? 'thubnail' : ''}`}>
            <div className='nav-bar'>
                <div className='icon red'></div>
                <div className='icon yellow'></div>
                <div className='icon green'></div>
                <div className='url'></div>
            </div>
            <div>
                {props.screen.elements.map((item) => {
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

export default Browser