import React, { Component } from 'react'
import styled from 'styled-components'
import { FormControl, FormGroup, InputGroup, Glyphicon, Grid, Button } from 'react-bootstrap'

const MainPanel = styled(Grid)`
  padding: 20px;
  color: #ccc;
  background-color: #181818;
  margin-top: 30px;
`
const Title = styled.h3`
  color: #eee;
  padding: 20px;
  border: 1px dashed rgba(255,255,255,0.3);
  margin-bottom: 20px;
`

const OwnButton = styled(Button)`
  margin-top : 20px;
`

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      value: '',
      found: false,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  handleName() {
    if (this.state.value === 'pruek') {
      this.props.checkLogin('5938f00a762ddb3642ac7399')
    } else if (this.state.value === 'ploy') {
      this.props.checkLogin('5938f093394156336ded8d4a')
    } else {
      this.setState({
        value: ''
      })
    }
  }

  render() {
    return (
      <center>
        <MainPanel>
          <Title> Login </Title>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter secret username "
            onChange={this.handleChange}
          />
          <OwnButton onClick={() => this.handleName()} >
            Submit
          </OwnButton>
        </MainPanel>
      </center>
    )
  }
}

export default Login
