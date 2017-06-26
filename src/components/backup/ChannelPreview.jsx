import React from 'react';
import {
    gql,
    graphql,
} from 'react-apollo';


const ChannelPreview = ({ data: { loading, error, channelById } }) => {  
return (
    <div>
      <div className="channelName">
        {channelById ? channelById.name : 'Loading...'}
      </div>
      <div>Loading Messages</div>
    </div>
  );
};

export const channelQuery = gql`
  query ChannelQuery($channelId : ID!) {
    channelById(id: $channelId) {
      id
      name
    }
  }
`;

export default (graphql(channelQuery, {
  options: (props) => ({
    variables: { channelId: props.channelId },
  }),
})(ChannelPreview));