import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Browser from '../Screens/Browser'
import {getProjectById} from '../../actions/projectAction'
import {moveToState, closeFlowDialog} from '../../actions/runnerAction'
import Modal from 'react-modal'
import {Card} from 'semantic-ui-react'
import _ from 'lodash'

import './Runner.scss'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width:'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


@connect((store) => {
    return {
        projectId: store.canvas.projectId,
        screenList: store.canvas.screenList,
        currentScreenId: store.runner.currentScreenId,
        openFlowDialog: store.runner.openFlowDialog,
        flowActions: store.runner.flowActions
    }
})
export default withRouter(class Runner extends Component {

    componentDidMount = () => {
        //Save first state of the application
        const {match} = this.props

        if (match.params.id) {
            this.props.dispatch(getProjectById(match.params.id))
        }
    }

    onCloseFlowDialog = () => {
        this.props.dispatch(closeFlowDialog())
    }

    renderScreen = () => {
        const {currentScreenId, screenList, openFlowDialog, flowActions} = this.props

        return (
            <div>
                <Modal isOpen={openFlowDialog} onRequestClose={this.onCloseFlowDialog} style={customStyles}>
                    <div className='options-container'>
                        {flowActions.map((action) => {
                            return (

                                <Card onClick={(e, data) => {
                                    this.props.dispatch(moveToState(action.goToState.value))
                                    this.props.dispatch(closeFlowDialog())
                                }}>
                                    <Card.Content header={action.actionName.value}/>
                                    <Card.Content description={action.actionDescription.value}/>
                                </Card>

                            )
                        })}
                    </div>
                </Modal>
                <Browser running
                         screen={currentScreenId ? _.find(screenList, (screen) => screen.id === currentScreenId) : screenList[0]}/>
            </div>
        )
    }

    render() {
        return this.renderScreen()
    }

})