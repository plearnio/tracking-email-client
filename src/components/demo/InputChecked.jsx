import React, { Component } from 'react'
import { FormControl, FormGroup, InputGroup, Glyphicon } from 'react-bootstrap'

class InputChecked extends Component {

  constructor(props) {
    super(props)
    this.state = {
      completed: false,
      value: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    if (e.target.value === 'complete') {
      this.setState({ completed: true })
      this.props.setCompleted(this.props.nameAction)
    } else {
      this.setState({ completed: false })
    }
    this.setState({ value: e.target.value })
  }

  render() {
    return (
      <FormGroup>
        <InputGroup>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter 'complete'"
            onChange={this.handleChange}
          />
          <InputGroup.Addon>
            <Glyphicon glyph={this.state.completed ? 'ok' : 'remove'} />
          </InputGroup.Addon>
        </InputGroup>
      </FormGroup>
    )
  }
}

export default InputChecked
