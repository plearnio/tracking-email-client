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
const ALink = styled.a`
  background-color: #282828;
  padding: 5px;
  border-radius: 3px;

  &:hover {
    color: white;
  }
`

const styles = {
  expanded: {
    width: '100%',
  }
}

const EmailLogDetails = ({ data: { loading, error, emailLogById } }) => {
  if (loading) {
    console.log(emailLogById)
    return <Loading />
  }
  if (error) {
    return <NotFound />
  }
  if (!emailLogById) {
    return <Loading />
  } else {
    console.log(emailLogById)
  }
  return (
    <Grid style={styles.expanded}>
      <Panel>
        <Row>
          <Col sm={12} md={12}>
            <Title> To User </Title> <Content> {emailLogById.toUser} </Content>
            <Title> E mail - Config </Title>
            <Content>
              <ALink href={`/admin/emailconfigs/${emailLogById.mailConfig._id}` }>
                {emailLogById.mailConfig.name}
              </ALink>
            </Content>
            <Title> Counter </Title>
            <Content> click : {emailLogById.counter.click} </Content>
            <Content> open : {emailLogById.counter.open} </Content>
            <Content> success : {emailLogById.success} </Content>
          </Col>
        </Row>
      </Panel>
    </Grid>
  )
}

EmailLogDetails.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    emailLogById: React.PropTypes.object,
  }).isRequired
}

export const EmailLogDetailsQuery = gql`
  query EmailLogDetailsQuery($emailLogId : ID!) {
    emailLogById(id: $emailLogId) {
      _id
      toUser
      counter {
        click
        open
      }
      mailConfig {
        _id
        name
        expectedFlow
      }
      success
    }
  }
`

export default (graphql(EmailLogDetailsQuery, {
  options: props => ({
    variables: { emailLogId: props.match.params.emailLogId },
  }),
})(EmailLogDetails))
