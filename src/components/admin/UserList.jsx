import React, { Component } from 'react'
import {
  gql,
  graphql
} from 'react-apollo'
import {
  Grid,
  Col,
  Row,
  Pagination,
  Table,
  DropdownButton,
  MenuItem,
  InputGroup,
  FormGroup,
  FormControl,
} from 'react-bootstrap'
import styled from 'styled-components'
import {
  withRouter
} from 'react-router-dom'

import NotFound from '../general/NotFound'
import Loading from '../general/Loading'
import SendMail from './SendMail'
import EmailConfigsMenu from './EmailConfigsMenu'
import Chart from './charts/ChartUserList'

const Content = styled.h4`
  color: #787878;
`

const TableContent = styled.h5`
  color: #1e1e1e;
  font-size: 90%;
`

const Panel = styled.div`
  background-color: #ddd;
  padding: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
`

const Title = styled.h3`
  background-color: transparent;
  outline: none;
  border: none;
  color: #1e1e1e;
`

const TableBodyPanel = styled.tbody`
  background-color: white;
`

const TableHeadPanel = styled.thead`
  background-color: white;
`

const StyledTable = styled(Table)`
  border: 1px solid rgba(0,0,0,0.5);
  margin-top: 20px;
`

const MyPagination = styled(Pagination)`
  > li > a {
    color: white;
    background-color: #585858;
    border: 1px solid rgba(255,255,255,0.1)
  }

  > .active > a {
    color: white;
    background-color: #282828;
    border: 1px solid rgba(255,255,255,0.1);
  }

  > .active > a:hover {
    color: white;
    background-color: #282828;
    border: 1px solid rgba(255,255,255,0.1);
  }

  > .disabled > a {
    color: white;
    background-color: #252525;
    border: 1px solid rgba(255,255,255,0.1);
  }

  > .disabled > a:focus {
    color: white;
    background-color: #252525;
    border: 1px solid rgba(255,255,255,0.1);
  }

  > .active > a:focus {
    border: 1px solid rgba(255,255,255,0.1);
    background-color: #282828;
  }

  > li > a:hover {
    border: 1px solid rgba(255,255,255,0.1);
    background-color: #282828;
    color: white;
  }
  
`

const Button = styled.button`
  background-color: #111;
  padding: 15px;
  border: 1px solid rgba(255,255,255,0.1);
  color:white;
  font-size: 110%;
`

const styles = {
  expanded: {
    width: '100%',
  }
}

class UserListDetails extends Component {

  constructor(props) {
    super(props)
    const { userListId } = this.props.match.params
    const page = parseInt(this.props.match.params.page, 10) || 1
    this.state = {
      userId: userListId,
      activePage: page,
      // allPage: userListById.age
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  setPage(pageAll) {
    this.setState({
      allPage: pageAll
    })
  }

  handleSelect(eventKey) {
    this.setState({
      activePage: eventKey
    }, () => {
      console.log(this.state.userId)
      this.props.history.replace(`/admin/userlists/${this.props.match.params.userListId}/${eventKey}`)
    })
  }

  writePage(allPage) {
    return (
      <MyPagination
        prev={false}
        next={false}
        first={false}
        last={false}
        ellipsis
        boundaryLinks
        items={allPage}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.handleSelect}
      />
    )
  }

  render() {
    const { loading, error, userListById, emailConfigs } = this.props.data
    let page = Number.parseInt(this.props.match.params.page, 10)
    const { userListId } = this.props.match.params
    if (loading) {
      return <Loading />
    }
    if (error) {
      return <NotFound />
    }
    if (!userListById) {
      return <Loading />
    } else {
      console.log(userListById)
    }
    if (!page) {
      this.props.history.replace(`/admin/userlists/${userListId}/1`)
      page = 1
    }
    return (
      <Grid style={styles.expanded}>
        <Panel>
          <Row>
            <Col sm={12} md={5}>
              <Title> Name </Title> <Content> {userListById.name} </Content>
              <Title> E-mail </Title> <Content> {userListById.userEmail} </Content>
              <Title> Age </Title> <Content> {userListById.age} </Content>
            </Col>
            <Col sm={12} md={7}>
              <SendMail userData={userListById} emailConfigs={emailConfigs} />
            </Col>
            <Col sm={12} md={12}>
              <StyledTable responsive>
                <TableHeadPanel>
                  <tr>
                    <th><TableContent >#</TableContent></th>
                    <th><TableContent >Actions</TableContent></th>
                    <th><TableContent >Timestamp</TableContent></th>
                  </tr>
                </TableHeadPanel>
                <TableBodyPanel>
                  {
                    userListById.logs.map((log, index) => {
                      return (
                        <tr key={log._id}>
                          <th><TableContent > {index + 1}</TableContent></th>
                          <th><TableContent > {log.action} </TableContent></th>
                          <th><TableContent > {log.timestamp} </TableContent></th>
                        </tr>
                      )
                    })
                  }
                </TableBodyPanel>
              </StyledTable>
              <center>
                { (userListById.logs.length === 0) ? (<TableContent >{'No Content'}</TableContent>) : this.writePage(userListById.pageAll) }
              </center>
            </Col>
          </Row>
        </Panel>
        <Chart dataStatistic={userListById.emailConfigListStat} allStat={userListById.allStat} />
      </Grid>
    )
  }
}

UserListDetails.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    userListById: React.PropTypes.object,
  }).isRequired,
  match: React.PropTypes.shape({
    params: React.PropTypes.object,
  }).isRequired,
  history: React.PropTypes.object.isRequired
}

export const UserListByIdDetailsQuery = gql`
  query UserListByIdDetailsQuery($userListId : ID!, $pageValue: Int) {
    userListById(id: $userListId, pageValue: $pageValue) {
      _id
      name
      userEmail
      age
      logs {
        _id
        action
        timestamp
      }
      pageNow
      pageAll
      emailConfigListStat {
        _id
        clickAvg
        openAvg
        success
        count
        mailConfig {
          name
          expectedFlow
        }
      }
      allStat {
        count
        successAvg
        clickAvg
        openAvg
      }
    }
    emailConfigs {
      _id
      name
      description
    }
  }
`

export default (graphql(UserListByIdDetailsQuery, {
  options: (props) => {
    return {
      variables: {
        userListId: props.match.params.userListId,
        pageValue: props.match.params.page || 1
      },
    }
  },
})(withRouter(UserListDetails)))
