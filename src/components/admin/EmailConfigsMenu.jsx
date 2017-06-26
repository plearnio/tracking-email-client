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
import EmailConfigs from './EmailConfigs'
import Loading from '../general/Loading'

const styles = {
  row: {
    width: '100%',
    height: '100%',
  }
}

const DataObjList = ({ data: { loading, error, emailConfigs } }) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!emailConfigs) {
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
                emailConfigs.map(emailconfig => (
                  <Link key={emailconfig._id} to={`/admin/emailconfigs/${emailconfig._id}`}>
                    <div className="channel" >
                      {emailconfig.name}
                    </div>
                  </Link>
                ))
              }
            </Col>
            <Col sm={6} md={8}>
              <div className="App">
                <Switch>
                  <Route path="/admin/emailconfigs/:emailConfigId" component={EmailConfigs} />
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
    emailConfigs {
      _id
      name
      description
    }
  }
`

export default graphql(dataObjListQuery, {
  options: props => ({
    variables: { menu: props.match.params.menu },
    pollInterval: 5000
  }),
})(DataObjList)

