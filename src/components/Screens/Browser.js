import React from 'react'
import PropTypes from 'prop-types'
import ContentElement from '../ContentElement/ContentElement'
import Element from '../Element/Element'
import RunElement from '../Element/RunElement'

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
                {props.screen.elements.map((item, index) => {

                    if (props.running) {

                        return (
                            <RunElement key={index} item={item}>
                                <ContentElement id={item.id} type={item.type} label={item.label} dropedElement={false}/>
                            </RunElement>
                        )

                    } else {

                        return (
                            <Element key={index} item={item} hideSourceOnDrag>
                                <ContentElement id={item.id} type={item.type} label={item.label} dropedElement/>
                            </Element>
                        )

                    }
                })}
            </div>
        </div>
    )
}


Browser.propTypes = {
    running: PropTypes.bool,
    screen: PropTypes.arrayOf(PropTypes.object)
}

export default Browser