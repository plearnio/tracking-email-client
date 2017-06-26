import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const styles = {
  root: {
    fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300,
  }
};

const Header = styled.div`
  background-color: #2472C8;
  color: white;
  padding: 20px;
  font-size: 1.5em;
`

const MaterialTitlePanel = (props) => {
  const rootStyle = props.style ? { ...styles.root, ...props.style } : styles.root;

  return (
    <div style={rootStyle}>
      <Header>{props.title}</Header>
      {props.children}
    </div>
  );
};

MaterialTitlePanel.propTypes = {
  style: PropTypes.object,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  children: PropTypes.object,
};

export default MaterialTitlePanel;
