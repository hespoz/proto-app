import React, { Component } from 'react'
import {connect} from 'react-redux'

import Browser from '../../commons/Screens/Browser'

import './PageList.scss'


@connect((store) => {
    return {
        screenList: store.canvas.screenList
    }
})
export default class PageList extends Component {

    render(){
        return (
            <div className='page-list-wrapper'>
                    {this.props.screenList.map((screen) => {
                      return (
                          <div className='elem-container'>{screen.id}</div>
                      )
                    })}
            </div>
        )
    }

}