import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import Browser from '../Screens/Browser'
import {getProjectById} from '../../actions/projectAction'
import _ from 'lodash'


@connect((store) => {
    return {
        projectId: store.canvas.projectId,
        screenList: store.canvas.screenList,
        currentScreenId: store.runner.currentScreenId
    }
})
export default withRouter(class Runner extends Component {

    componentDidMount = () => {
        //Save first state of the application
        const {match} = this.props

        if(match.params.id) {
            this.props.dispatch(getProjectById(match.params.id))
        }
    }

    renderScreen = () => {
        const { currentScreenId, screenList } = this.props

        if(currentScreenId) {
            return <Browser running screen={_.find(screenList, (screen) => screen.id === currentScreenId)}/>
        } else {
            return <Browser running screen={screenList[0]}/>
        }

    }

    render() {
        return this.renderScreen()
    }

})