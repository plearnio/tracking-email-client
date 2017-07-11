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
import Chart from './charts/ChartEmailConfigs'

const Content = styled.h4`
  color: #787878;
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

const PreviewMail = styled.div`
  padding: 20px;
  border: 2px dashed rgba(0,0,0,0.3);
`

const styles = {
  expanded: {
    width: '100%',
  }
}
const previewMail = (name) => { 
  return { __html: `<h1 style="color:#b1a6ef">${name}</h1><a href="/demo/">click</a>` }
}

const EmailConfigDetails = ({ data: { loading, error, emailConfigById } }) => {
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <NotFound />
  }
  if (!emailConfigById) {
    return <Loading />
  } else {
    console.log(emailConfigById)
  }
  return (
    <Grid style={styles.expanded}>
      <Panel>
        <Row>
          <Col sm={12} md={4}>
            <Title> Name </Title> <Content> {emailConfigById.name} </Content>
          </Col>
          <Col sm={12} md={8}>
            <Title> Description </Title> <Content> {emailConfigById.description} </Content>
          </Col>
          <Col sm={12} md={12}>
            <Title> Demo </Title> <Content><center><PreviewMail dangerouslySetInnerHTML={previewMail(emailConfigById.name)} /></center></Content>
          </Col>
        </Row>
      </Panel>
      <Chart dataStatistic={emailConfigById.statistic} allSuccess={emailConfigById.allSuccess} />
    </Grid>
  )
}

EmailConfigDetails.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    emailConfigById: React.PropTypes.object,
  }).isRequired
}

export const EmailConfigDetailsQuery = gql`
  query EmailConfigDetailsQuery($emailConfigId : ID!) {
    emailConfigById(id: $emailConfigId) {
      _id
      name
      description
      expectedFlow
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

export default (graphql(EmailConfigDetailsQuery, {
  options: props => ({
    variables: { emailConfigId: props.match.params.emailConfigId },
  }),
})(EmailConfigDetails))
