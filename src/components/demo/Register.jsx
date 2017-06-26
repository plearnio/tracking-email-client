import React, { Component } from 'react'
import styled from 'styled-components'
import { Grid, Button } from 'react-bootstrap'
import axios from 'axios'
// import _ from 'lodash'

import Input from './InputChecked'

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

const CompleteAll = styled.h4`
  width: 300px;
  padding: 20px;
  border: 1px dashed rgba(255,255,255,0.3)
`

const ButtonLink = styled.button`
  background-color: #111;
  padding: 15px;
  border: 1px solid rgba(255,255,255,0.1);
  color:white;
  font-size: 110%;
  margin-top: 10px;
`

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      actions: {
        action1: false,
        action2: false,
        action3: false,
        success: false
      }
    }
    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleCompleted('Enter demo page')
  }

  handleCompleted(name) {
    const newActions = this.state.actions
    newActions[name] = true
    this.setState({
      actions: newActions
    })
    axios.get(`http://localhost:4000/tracking/${name}/Register`)
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <center>
        <MainPanel>
          <Title> Register </Title>
          <Input nameAction="action1" setCompleted={this.handleCompleted} />
          {
            this.state.actions.action1 &&
            <Input nameAction="action2" setCompleted={this.handleCompleted} />
          }
          {
            this.state.actions.action2 &&
            <Input nameAction="action3" setCompleted={this.handleCompleted} />
          }
          {
            this.state.actions.action3 &&
            <Button bsStyle="success" onClick={() => this.handleCompleted('success')} >
              Success
            </Button>
          }
          {
            this.state.actions.success && <CompleteAll> Flow complete !! </CompleteAll>
          }
          <br /><a href="admin/flowConfigs"><ButtonLink> Go back to flowConfigs </ButtonLink></a>
        </MainPanel>
      </center>
    )
  }
}

export default Register
