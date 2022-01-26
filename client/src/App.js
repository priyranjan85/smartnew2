import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import logo from './logo.svg';
import './App.css'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Flip from './components/games/Flip/index.js';
import Dice from './components/games/Dice/index.js';
import NotFound from './components/layout/NotFound';
// import Routes from './components/routing/Routes'
import { LOGOUT } from './actions/types'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import setAuthToken from './utils/setAuthToken'

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    // store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT })
    })
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/flip" component={Flip} />
            <Route exact path="/dice" component={Dice} />
            <Route component={NotFound} />
            {/* <Route component={Routes} /> */}
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
