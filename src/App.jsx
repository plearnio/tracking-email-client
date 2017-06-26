
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface,
  toIdValue,
} from 'react-apollo'
import Sidebar from 'react-sidebar'

import './static/css/App.css'

import EmailConfigsMenu from './components/admin/EmailConfigsMenu'
import FlowConfigsMenu from './components/admin/FlowConfigsMenu'
import EmailLogsMenu from './components/admin/EmailLogsMenu'
import SidebarContent from './components/admin/SidebarContent'

import NotFound from './components/general/NotFound'

import Register from './components/demo/Register'

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' })

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500)
  },
}])

function dataIdFromObject(result) {
  if (result.__typename) {
    if (result.id !== undefined) {
      return `${result.__typename}:${result.id}`
    }
  }
  return null
}

const client = new ApolloClient({
  networkInterface,
  customResolvers: {
    Query: {
      channelById: (_, args) => {
        return toIdValue(dataIdFromObject({ __typename: 'Channel', id: args.id }))
      },
    },
  },
  dataIdFromObject: o => o.id,
})

const styles = {
  staticMenu: {
    borderRadius: '0px 10px 10px 0px',
    width: '35px',
    fontSize: '15px',
    backgroundColor: 'rgba(255,255,255,0.5)',
    textDecoration: 'none',
    color: 'white',
    padding: 8,
    position: 'fixed',
    top: '120px',
    left: '0px'
  },
  content: {
    padding: '16px',
  },
}

const mediaql = window.matchMedia('(min-width: 800px)')

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      firstPage: true,
      notMobile: true,
      mql: mediaql,
      docked: true,
      open: false,
      nowPage: 1
    }

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this)
    this.toggleOpen = this.toggleOpen.bind(this)
    this.onSetOpen = this.onSetOpen.bind(this)
    this.setPage = this.setPage.bind(this)
  }

  componentWillMount() {
    mediaql.addListener(this.mediaQueryChanged)
    this.setState({ mql: mediaql, docked: mediaql.matches })
  }

  componentWillUnmount() {
    this.state.mediaql.removeListener(this.mediaQueryChanged)
  }

  onSetOpen(newOpen) {
    this.setState({ open: newOpen })
  }

  setPage(pageNum) {
    console.log(pageNum)
    this.setState({
      nowPage: pageNum
    })
  }

  toggleOpen(ev) {
    this.setState({ open: !this.state.open })

    if (ev) {
      ev.preventDefault()
    }
  }

  mediaQueryChanged() {
    this.setState({
      notMobile: this.state.mql.matches,
      mql: mediaql,
      docked: this.state.mql.matches,
    })
  }

  render() {
    const toggleMenu = (
      <div>
        {
          !this.state.docked &&
          <a onClick={this.toggleOpen.bind(this)} href="" style={styles.staticMenu}>
            M<br />E<br />N<br />U
          </a>
        }
      </div>)

    const sidebarProps = {
      sidebar: <SidebarContent nowPage={this.state.nowPage} />,
      docked: this.state.docked,
      open: this.state.open,
      onSetOpen: this.onSetOpen,
    }

    return (
      <Router>
        <Switch>
          <Route exact path="/demo/" component={Register} />
          <Route path="/admin/">
            <Sidebar {...sidebarProps}>
              <ApolloProvider client={client}>
                <div className="App">
                  {toggleMenu}
                  <div className="navbar" >
                    Tracking E-Mail
                  </div>
                  <Switch>
                    <Route path="/admin/emailconfigs" component={EmailConfigsMenu} />
                    <Route path="/admin/flowconfigs" component={FlowConfigsMenu} />
                    <Route path="/admin/maillogs" component={EmailLogsMenu} />
                    <Route path="/admin/userlist" component={NotFound} />
                    <Route path="/">
                      <Redirect to="/admin/emailconfigs" />
                    </Route>
                  </Switch>
                </div>
              </ApolloProvider>
            </Sidebar>
          </Route>
          <Route path="/">
            <Redirect to="/demo" />
          </Route>
        </Switch>
      </Router>
    )
  }
}

export default App
