import React from 'react'
import {
    gql,
    graphql,
} from 'react-apollo'

import MessageList from './MessageList'
import ChannelPreview from './ChannelPreview'
import NotFound from './NotFound'


const ChannelDetails = ({ data: { loading, error, channelById }, match }) => {
  if (loading) {
    return <ChannelPreview channelId={match.params.channelId} />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  if (channelById === null) {
    return <NotFound />
  }
  return (
    <div>
      <div className="channelName">
        {channelById.name}
      </div>
      <MessageList messages={channelById.messages} />
    </div>
  )
}

ChannelDetails.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    channelById: React.PropTypes.array,
  }).isRequired,
  match: React.PropTypes.shape.isRequired
}

export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId : ID!) {
    channelById(id: $channelId) {
      id
      name
      messages {
        id
        text
      }
    }
  }
`

export default (graphql(channelDetailsQuery, {
  options: (props) => ({
    variables: { channelId: props.match.params.channelId },
    pollInterval: 5000
  }),
})(ChannelDetails))
