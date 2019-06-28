import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import AuthorizedRoute from './AuthorizedRoute'
import store from './store'

import { PrivateRoute } from './Components/PrivateRoute';
// Layouts
import Login from './pages/login'
import Register from './pages/register'
import Homepage from './pages/homepage'
import ListPets from './pages/listofpets'
import AddPet from './pages/addapet'
import Profile from './pages/profile'

import { configureFakeBackend } from './_helpers';
configureFakeBackend();

// ** See notes on this `<App>` component at the bottom of this file **
const App = props => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/homepage" component={Homepage} />
          <Route path="/register" component={Register} />
          <Route path="/listofpets" component={ListPets} />
          <Route path="/addpet" component={AddPet} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <Redirect to="/homepage" />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(<App />, document.getElementById('root'))