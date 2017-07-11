import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Modal,
  Form,
  FormGroup,
  Col,
  FormControl,
  DropdownButton,
  InputGroup,
  MenuItem,
  ButtonGroup,
  Button,
} from 'react-bootstrap'
import axios from 'axios'

const OwnButton = styled(Button)`
  padding: 10px;
  border: 1px solid rgba(0,0,0,0.3);
  color: #111;
  margin-top: 10px;
`

class SendMailModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      fromPassword: '',
      fromMail: 'p.plearn.io@gmail.com',
      data: this.props.userData,
      isPostSuccess: false,
      isPosted: false,
      emailConfig: this.props.emailConfigs[0]
    }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.sendMailToServer = this.sendMailToServer.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  sendMailToServer(e) {
    axios.post('http://localhost:4000/sendmail', this.state).then((res) => {
      if (res.data === 'correct !') {
        this.setState({
          isPosted: true,
          isPostSuccess: true
        })
      } else {
        this.setState({
          isPosted: true,
          isPostSuccess: false
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  handleSelect(emailConfig) {
    this.state.emailConfig = emailConfig
    this.setState(this.state)
  }

  handleChange(e) {
    this.state[e.target.name] = e.target.value
    this.setState(this.state)
  }

  close() {
    this.setState({ showModal: false, isPosted: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const { userData, emailConfigs } = this.props
    return (
      <div>
        <ButtonGroup>
          <OwnButton onClick={this.open} >
            Send Demo Mail
          </OwnButton>
          <DropdownButton
            componentClass={InputGroup.Button}
            id="input-dropdown-addon"
            title={this.state.emailConfig.name}
            style={{ padding: '10px',
              marginTop: '10px',
              color: '#111',
              border: '1px solid rgba(0,0,0,0.3)'
            }}
          >
            {
              emailConfigs.map((emailConfig) => {
                return (
                  <MenuItem
                    key={emailConfig._id}
                    name="emailConfig"
                    onClick={() => this.handleSelect(emailConfig)}
                  >
                    {emailConfig.name}
                  </MenuItem>
                )
              })
            }
          </DropdownButton>
        </ButtonGroup>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Send Email to User {userData.name}</Modal.Title>
            <Modal.Title>Type : {this.state.emailConfig.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <h2> To </h2>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="email"
                    name="toMail"
                    value={userData.userEmail}
                    disabled
                  />
                </Col>
              </FormGroup>
              <hr />
              <h2> From </h2>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="email"
                    name="fromMail"
                    value="p.plearn.io@gmail.com"
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="password"
                    name="fromPassword"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
            </Form>
            {(this.state.isPosted && this.state.isPostSuccess) && (<center><hr />Pass</center>)}
            {(this.state.isPosted && !this.state.isPostSuccess) && (<center><hr />Fail</center>)}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.sendMailToServer}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

SendMailModal.propTypes = {
  userData: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired
  }).isRequired,
}

export default SendMailModal
