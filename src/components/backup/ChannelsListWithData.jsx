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

import AddChannel from './AddChannel'
import SearchChannel from './SearchChannel'
import EmailConfigs from './EmailConfigs'
import NotFound from './NotFound'

const styles = {
  row: {
    width: '100%',
    height: '100%',
  }
}

const ChannelsList = ({ data: { loading, error, channels, emailConfigs } }) => {
  if (loading) {
    return <p>Loading ...</p>
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (!channels || !emailConfigs) {
    return <p>Loading ...</p>
  } else {
    console.log(emailConfigs)
  }
  const dummySentences = ['Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'Donec hendrerit tempor tellus.', 'Donec pretium posuere tellus.', 'Proin quam nisl, tincidunt et, mattis eget, convallis nec, purus.', 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'Nulla posuere.', 'Donec vitae dolor.', 'Nullam tristique diam non turpis.', 'Cras placerat accumsan nulla.', 'Nullam rutrum.', 'Nam vestibulum accumsan nisl.']
  const dummy = () => (<div> test </div>)
  return (
    <div className="channelsList">
      <Grid style={styles.row}>
        <Router>
          <Row style={styles.row} >
            <Col sm={6} md={3}>
              <AddChannel />
              <SearchChannel />
              { channels.map(ch => (
                <div key={ch.id} className={`channel ${ch.id < 0 ? 'optimistic' : ''}`}>
                  <Link to={ch.id < 0 ? '/' : `/channel/${ch.id}`}>
                    {ch.name}
                  </Link>
                </div>
                )
              )}
            </Col>
            <Col sm={6} md={3}>
              { emailConfigs.map(emailconfig => (
                <div key={emailconfig._id} className="channel" >
                  <Link to={`/emailConfigs/${emailconfig._id}`}>
                    {emailconfig.name}
                  </Link>
                </div>
                )
              )}
            </Col>
            <Col sm={6} md={3}>
              <div className="App">
                <Switch>
                  <Route path="/emailConfigs/:emailConfigId" component={EmailConfigs} />
                </Switch>
                <Link key="1" to="/maillogs/test" style={styles.sidebarLink}>
                  Mail Configuration
                </Link>
                <Link key="2" to="/maillogs/test2" style={styles.sidebarLink}>
                  Flows Configuration
                </Link>
                <Switch>
                  <Route path="/maillogs/test" component={NotFound} />
                  <Route path="/maillogs/test2" component={dummy} />
                </Switch>
              </div>
            </Col>
            <Col sm={6} md={3} ><code>&lt;{'Col sm={6} md={3}'} /&gt;</code><br />{dummySentences.slice(0, 6).join(' ')}</Col>
          </Row>
        </Router>
      </Grid>
    </div>
  )
}

ChannelsList.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    channels: React.PropTypes.array,
    views: React.PropTypes.array,
  }).isRequired,
}

export const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
    emailConfigs {
      _id
      name
      description
    }
  }
`

export default graphql(channelsListQuery)(ChannelsList)

