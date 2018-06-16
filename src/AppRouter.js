import React, {Component} from 'react'
import { Router, Link } from '@reach/router'
import App from './App'

let Home = () => <div>Home</div>
let Dash = () => <div>Dash</div>

export default class AppRouter extends Component {

    render() {
        return <Router>
            <Home path="/" />
            <Dash path="/dashboard" />
            <App path="/canvas/:id" />
        </Router>
    }
}