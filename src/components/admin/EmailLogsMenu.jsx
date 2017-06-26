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
import EmailLogs from './EmailLogs'
import Loading from '../general/Loading'

const styles = {
  row: {
    width: '100%',
    height: '100%',
  }
}

const DataObjList = ({ data: { loading, error, emailLogs } }) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!emailLogs) {
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
                emailLogs.map(emailLog => (
                  <Link key={emailLog._id} to={`/admin/emaillogs/${emailLog._id}`}>
                    <div className="channel" >
                      {emailLog._id}
                    </div>
                  </Link>
                ))
              }
            </Col>
            <Col sm={6} md={8}>
              <div className="App">
                <Switch>
                  <Route path="/admin/emaillogs/:emailLogId" component={EmailLogs} />
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
    emailLogs {
      _id
      toUser
    }
  }
`

export default graphql(dataObjListQuery, {
  options: props => ({
    variables: { menu: props.match.params.menu },
    pollInterval: 5000
  }),
})(DataObjList)

