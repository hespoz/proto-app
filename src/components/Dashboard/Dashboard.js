import React, {Component} from 'react'
import { Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {createNewProject} from '../../actions/projectAction'
import { withRouter } from 'react-router'

@connect((store) => {
    return {
        projectId:store.project.projectId,
        screenList: store.canvas.screenList,
        projectCreated:store.project.projectCreated
    }
})
export default withRouter(class Dashboard extends Component {

    componentDidUpdate = () => {
        const { history } = this.props
        if(this.props.projectCreated) {
            history.push(`/canvas/${this.props.projectId}`)
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <h3 className="title">Dashboard</h3>

                <Button onClick={() => {
                    this.props.dispatch(createNewProject({
                        id: this.props.projectId,
                        screenList: this.props.screenList
                    }))
                }}>New project</Button>

            </div>
        )
    }

})