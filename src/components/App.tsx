import React, { Fragment } from 'react'
import {
  RouteComponentProps,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Dashboard from '../pages/Dashboard'
import CreateGoal from '../pages/CreateGoal'
import NotFound from '../pages/NotFound'
import NavBar from './NavBar'

const App: React.FC<RouteComponentProps> = () => {
  return (
    <Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <Fragment>
            <NavBar />
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/creategoal" component={CreateGoal} />
              <Route path="/notfound" component={NotFound} />
            </Switch>
          </Fragment>
        )}
      />
    </Fragment>
  )
}

export default withRouter(App)
