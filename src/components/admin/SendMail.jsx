import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Modal,
  Form,
  FormGroup,
  Col,
  FormControl
} from 'react-bootstrap'
import axios from 'axios'

const Button = styled.button`
  background-color: #111;
  padding: 15px;
  border: 1px solid rgba(255,255,255,0.1);
  color:white;
  margin-top: 10px;
  font-size: 110%;
`

const ModalButton = Button.extend`
  background-color: #282828;
  border-radius: 5px;
  padding: 10px;
`

class SendMailModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      data: {
        toMail: '',
        userId: this.props.userId,
        fromMail: '',
        fromPassword: '',
        secret: '',
      },
      isPostSuccess: false,
      isPosted: false
    }
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.sendMailToServer = this.sendMailToServer.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  sendMailToServer(e) {
    console.log(e.target.value)
    axios.post('http://localhost:4000/sendmail', this.state.data).then((res) => {
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

  handleChange(e) {
    console.log(e.target.name)
    this.state.data[e.target.name] = e.target.value
    this.setState(this.state)
  }

  close() {
    this.setState({ showModal: false, isPosted: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const { userName } = this.props

    return (
      <div>
        <Button onClick={this.open} >
          Send Demo Mail
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Send Email to User {userName}</Modal.Title>
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
                    placeholder="Email"
                    name="toMail"
                    onChange={this.handleChange}
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
                    placeholder="Email"
                    name="fromMail"
                    onChange={this.handleChange}
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
              <hr />
              <h2> Secret </h2>
              <FormGroup controlId="formHorizontalEmail">
                <Col sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl
                    type="password"
                    placeholder="secret for admin"
                    name="secret"
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
            </Form>
            {(this.state.isPosted && this.state.isPostSuccess) && (<center><hr />Pass</center>)}
            {(this.state.isPosted && !this.state.isPostSuccess) && (<center><hr />Fail</center>)}
          </Modal.Body>
          <Modal.Footer>
            <ModalButton onClick={this.sendMailToServer}>Submit</ModalButton>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

SendMailModal.propTypes = {
  userId: React.PropTypes.string.isRequired,
  userName: React.PropTypes.string.isRequired
}

export default SendMailModal
