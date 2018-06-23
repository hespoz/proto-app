import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ControlType} from '../../commons/ControlType'
import {moveToState, openFlowDialog} from '../../actions/runnerAction'


import _ from 'lodash'

const style = {

}

@connect((store) => {
    return {

    }
})
export default class RunElement extends Component {

    onElementClick = (item) => {
        switch(item.type) {
            case ControlType.BUTTON:
                const actions = _.get(item, 'props.actions')
                if (actions) {
                    if(actions.length > 1) {
                        this.props.dispatch(openFlowDialog(actions))
                    } else {
                        this.props.dispatch(moveToState(actions[0].goToState.value))
                    }
                }
                console.log(item)
                break;
            default:
                break;
        }
    }

    render() {

        const {
            item
        } = this.props


        const left = item.left
        const top = item.top
        const height = `${item.height}px`
        const width = `${item.width}px`


        return (
            <div key={this.props.key} className="clickable-element-wrapper" style={{...style, left, top, height, width }} onClick={() => {
                //If there is more than one action show a dialog with the options. Else change page.
                this.onElementClick(item)
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


