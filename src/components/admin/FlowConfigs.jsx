import React from 'react'
import {
  gql,
  graphql
} from 'react-apollo'
import {
  Grid,
  Col,
  Row
} from 'react-bootstrap'
import styled from 'styled-components'

import NotFound from '../general/NotFound'
import Loading from '../general/Loading'

const Content = styled.h4`
  color: #969696;
`

const Action = styled(Content)`
  padding: 10px;
  border: 1px dashed rgba(255,255,255,0.5)
`

const Panel = styled.div`
  background-color: #181818;
  padding: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
`

const Title = styled.h3`
  background-color: transparent;
  outline: none;
  border: none;
  color: #ddd;
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

const FlowConfigDetails = ({ data: { loading, error, flowConfigById } }) => {
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <NotFound />
  }
  if (!flowConfigById) {
    return <Loading />
  }
  return (
    <Grid style={styles.expanded}>
      <Panel>
        <Row>
          <Col sm={12} md={4}>
            <Title> Name </Title> <Content> {flowConfigById.name} </Content>
          </Col>
          <Col sm={12} md={8}>
            <Title> Description </Title> <Content> {flowConfigById.description} </Content>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={12}>
            <center>
              <Title> Actions </Title>
              {
                flowConfigById.actions.map(action => (
                  <Action key={action.name}> {action.name} </Action>
                ))
              }
              <a href="/demo"><Button> {flowConfigById.name} Demo </Button></a>
            </center>
          </Col>
        </Row>
      </Panel>
    </Grid>
  )
}

FlowConfigDetails.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    emailConfigById: React.PropTypes.object,
  }).isRequired
}

export const FlowConfigDetailsQuery = gql`
  query FlowConfigDetailsQuery($flowConfigId : ID!) {
    flowConfigById(id: $flowConfigId) {
      _id
      name
      description
      actions {
        name
      }
      url
      successAction {
        name
      }
      actionsLen
    }
  }
`

export default (graphql(FlowConfigDetailsQuery, {
  options: props => ({
    variables: { flowConfigId: props.match.params.flowConfigId },
  }),
})(FlowConfigDetails))
