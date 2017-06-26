import React from 'react'
import PropTypes from 'prop-types'
import {
  Link,
} from 'react-router-dom'
import styled from 'styled-components'

import MaterialTitlePanel from './MaterialTitlePanel'
// import ChannelDetails from './ChannelDetails'

const MenuHover = styled.div`
  padding: 15px 20px 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #ccc;
  font-size: 110%;

  &:hover {
    background: #084771;
    transition: 300ms all ease-out;
  }

  & a {
    color:#ccc
  }
`

const styles = {
  sidebar: {
    overflow: 'hidden',
    width: 256,
    height: '100%',
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    height: '100%',
    backgroundColor: '#252526',
  },
}

const SidebarContent = (props) => {
  const style = props.style ? { ...styles.sidebar, ...props.style } : styles.sidebar

  return (
    <MaterialTitlePanel title="Menu" style={style}>
      <div style={styles.content}>
        <MenuHover>
          <Link key="1" to="/admin/emailconfigs">Mail Configuration</Link>
        </MenuHover>
        <MenuHover>
          <Link key="2" to="/admin/flowconfigs">Flows Configuration</Link>
        </MenuHover>
        <MenuHover>
          <Link key="3" to="/admin/maillogs">Mail Logs</Link>
        </MenuHover>
        <MenuHover>
          <Link key="4" to="/admin/userlist">User Infomation</Link>
        </MenuHover>
      </div>
    </MaterialTitlePanel>
  )
}

SidebarContent.propTypes = {
  style: PropTypes.object,
}

export default SidebarContent
