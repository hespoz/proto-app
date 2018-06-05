import React, {Component} from 'react'
import {Form, Select} from 'semantic-ui-react'
import {connect} from "react-redux"
import {updateElementProp} from "../../../actions/canvasAction";


@connect((store) => {
    return {
        selectedElementInfo: store.canvas.selectedElementInfo
    }
})
export default class TextFieldConfig extends Component {

    render() {

        const {selectedElementInfo} = this.props

        return (
            <div className='content-container'>
                <Form>
                    <Form.Field>
                        <label>{selectedElementInfo.props.name.label}</label>
                        <input onChange={(e, data) => {
                            this.props.dispatch(updateElementProp("name", e.target.value))
                        }}
                        value={selectedElementInfo.props.name.value}/>
                    </Form.Field>
                    <Form.Field>
                        <label>{selectedElementInfo.props.fieldType.label}</label>
                        <Select
                            placeholder='Field type'
                            options={selectedElementInfo.props.fieldType.options}
                            value={selectedElementInfo.props.fieldType.value}
                            onChange={(e, {value}) => {
                                this.props.dispatch(updateElementProp("fieldType", value))
                            }}
                        />
                    </Form.Field>
                </Form>
            </div>
        )
    }

}
