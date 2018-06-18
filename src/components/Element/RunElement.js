import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const style = {

}

@connect((store) => {
    return {

    }
})
export default class RunElement extends Component {

    render() {

        const left = this.props.left
        const top = this.props.top
        const height = `${this.props.height}px`
        const width = `${this.props.width}px`

        return (
            <div key={this.props.key} className="element-wrapper" style={{...style, left, top, height, width }} onClick={() => {
                //If there is more than one action show a dialog with the options. Else change page.
            }}>
                {this.props.children}
            </div>
        )

    }
}

RunElement.propTypes = {
    key: PropTypes.number,
    item: PropTypes.shape({
        id: PropTypes.string,
        left: PropTypes.number,
        top: PropTypes.number,
        height: PropTypes.number,
        width: PropTypes.number
    })
}


