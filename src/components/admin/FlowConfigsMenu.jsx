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
import FlowConfigs from './FlowConfigs'
import Loading from '../general/Loading'

const styles = {
  row: {
    width: '100%',
    height: '100%',
  }
}

const DataObjList = ({ data: { loading, error, flowConfigs } }) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!flowConfigs) {
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
                flowConfigs.map(flowConfig => (
                  <Link key={flowConfig._id} to={`/admin/flowconfigs/${flowConfig._id}`}>
                    <div className="channel" >
                      {flowConfig.name}
                    </div>
                  </Link>
                ))
              }
            </Col>
            <Col sm={6} md={8}>
              <div className="App">
                <Switch>
                  <Route path="/admin/flowconfigs/:flowConfigId" component={FlowConfigs} />
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
    flowConfigs {
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

