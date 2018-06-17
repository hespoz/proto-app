import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import App from './App'
import Dashboard from './components/Dashboard/Dashboard'
import Runner from './components/Runner/Runner'

let Home = () => <div>Home</div>
let NoMatch = () => <div><h1>No Match</h1></div>


export default class AppRouter extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route exact path="/canvas/:id" component={App}/>
                    <Route exact path="/run/:id" component={Runner}/>
                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        )
    }
}