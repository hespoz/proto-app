import React from 'react'
import ContentElement from '../../commons/ContentElement/ContentElement'
import Element from '../../components/Element/Element'

const style = {

}

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

                    if (props.running) {
                        let left = item.left
                        let top = item.top
                        let height = `${item.height}px`
                        let width = `${item.width}px`

                       return (
                        <div className="element-wrapper" style={{ 'left': left, 'top': top, 'height': height, 'width': width }}>
                            <ContentElement id={item.id} type={item.type} label={item.label} dropedElement={false}/>
                        </div>)

                    } else {
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
                    }
                })}
            </div>
        </div>
    )
}

export default Browser