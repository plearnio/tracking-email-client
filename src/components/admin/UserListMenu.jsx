import React from 'react'
import {
    gql,
    graphql,
} from 'react-apollo'
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom'

import SearchChannel from './SearchChannel'
import UserList from './UserList'
import Loading from '../general/Loading'

const styles = {
  row: {
    width: '100%',
    height: '100%',
  }
}

const DataObjList = ({ data: { loading, error, userLists } }) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!userLists) {
    return <Loading />
  }

  return (
    <div className="channelsList">
      <Grid style={styles.row}>
        <Router>
          <Row style={styles.row} >
            <Col sm={6} md={4}>
              <SearchChannel />
              {
                userLists.map(userList => (
                  <Link key={userList._id} to={`/admin/userlists/${userList._id}`}>
                    <div className="channel" >
                      {userList.name}
                    </div>
                  </Link>
                ))
              }
            </Col>
            <Col sm={6} md={8}>
              <div className="App">
                <Switch>
                  <Route path="/admin/userlists/:userListId/:page" component={UserList} />
                  <Route path="/admin/userlists/:userListId" component={UserList} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Router>
      </Grid>
    </div>
  )
}

DataObjList.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    channels: React.PropTypes.array,
    views: React.PropTypes.array,
  }).isRequired,
}

export const dataObjListQuery = gql`
  query dataObjListQuery {
    userLists {
      _id
      name
    }
  }
`

export default graphql(dataObjListQuery, {
  options: () => ({
    pollInterval: 5000
  }),
})(DataObjList)

