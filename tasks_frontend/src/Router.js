import React, { PureComponent } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

import MainLayout from './pages/MainLayout'
import Register from './pages/Register'
import Login from './pages/Login'
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'
import VerifyEmail from './pages/VerifyEmail'
import { history } from './helpers'

class MainRouter extends PureComponent {
  render() {
    const OpenRoute = ({ component: Component, layout: Layout, ...rest }) => (
      <Route {...rest} render={(props) => <Component {...props} />} />
    )
    const AuthRoute = ({ component: Component, layout: Layout, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          store.getState().user.userToken ? (
            <Layout {...props}>
              <Component {...props} />
            </Layout>
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    )
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <OpenRoute path="/" layout={MainLayout} exact component={Login} />
            <OpenRoute
              path="/login"
              layout={MainLayout}
              exact
              component={Login}
            />
            <OpenRoute
              path="/register"
              layout={MainLayout}
              exact
              component={Register}
            />
            <OpenRoute
              path="/verify-email/:token"
              exact
              component={VerifyEmail}
            />
            <AuthRoute
              path="/tasks"
              layout={MainLayout}
              exact
              component={Tasks}
            />
            <AuthRoute
              path="/profile"
              layout={MainLayout}
              exact
              component={Profile}
            />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
export default MainRouter
