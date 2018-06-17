import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import Browser from '../../commons/Screens/Browser'
import {getProjectById} from "../../actions/projectAction";

@connect((store) => {
    return {
        projectId: store.canvas.projectId,
        screenList: store.canvas.screenList
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

    renderScreens = () => {
        return this.props.screenList.map((screen) => {
            return <Browser running screen={screen}/>
        })
    }

    //Render all screens, but just hide and show.
    render() {
        return this.renderScreens()
    }

})