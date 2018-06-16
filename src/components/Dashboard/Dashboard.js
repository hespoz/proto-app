import React, {Component} from 'react'
import { Button } from 'semantic-ui-react'

export default class Dashboard extends Component {

    render() {
        return (
            <div className="container-fluid">
                <h3 className="title">Dashboard</h3>

                <Button onClick={() => {
                    
                }}>New project</Button>

            </div>
        )
    }

}