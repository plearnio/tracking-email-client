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
import Chart from './charts/ChartFlowConfigs'

const Content = styled.h4`
  color: #787878;
`

const Action = styled(Content)`
  padding: 10px;
  border: 1px dashed rgba(0,0,0,0.4)
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

const Button = styled.button`
  background-color: #353535;
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
  } else {
    console.log(flowConfigById)
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
              {}
              <a href={`/demo/${flowConfigById.name.toLowerCase()}`}><Button> {flowConfigById.name} Demo </Button></a>
            </center>
          </Col>
        </Row>
      </Panel>
      <Chart dataStatistic={flowConfigById.statistic} allSuccess={flowConfigById.allSuccess} />
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
      allSuccess {
        _id
        count
      }
      statistic {
        total
        successAvg
      }
    }
  }
`

export default (graphql(FlowConfigDetailsQuery, {
  options: props => ({
    variables: { flowConfigId: props.match.params.flowConfigId },
  }),
})(FlowConfigDetails))
