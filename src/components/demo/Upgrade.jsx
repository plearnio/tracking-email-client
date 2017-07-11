import React, { Component } from 'react'
import styled from 'styled-components'
import { Grid, Button } from 'react-bootstrap'
import axios from 'axios'
// import _ from 'lodash'

import Input from './InputChecked'
import Tracking from './Tracking'

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

class Upgrade extends Component {

  constructor(props) {
    super(props)
    this.state = {
      actions: {
        action1: false,
        Submit: false
      }
    }
    this.handleCompleted = this.handleCompleted.bind(this)
    this.handleCompleted('Enter upgrade page')
  }

  handleCompleted(nameAction) {
    const newActions = this.state.actions
    newActions[nameAction] = true
    this.setState({
      actions: newActions
    })
    console.log(nameAction)
    const tracking = new Tracking({
      url: 'http://localhost:4000/tracking',
      secret: 'secret'
    })
    tracking.passAction('Upgrade', nameAction, this.props.userId)
  }

  render() {
    return (
      <center>
        <MainPanel>
          <Title> Upgrade </Title>
          <Input nameAction="action1" setCompleted={this.handleCompleted} />
          {
            this.state.actions.action1 &&
            <Button bsStyle="success" onClick={() => this.handleCompleted('Submit')} >
              Success
            </Button>
          }
          {
            this.state.actions.Submit && <CompleteAll> Flow complete !! </CompleteAll>
          }
          <br /><a href="/admin/flowConfigs"><ButtonLink> Go back to flowConfigs </ButtonLink></a>
        </MainPanel>
      </center>
    )
  }
}

export default Upgrade
