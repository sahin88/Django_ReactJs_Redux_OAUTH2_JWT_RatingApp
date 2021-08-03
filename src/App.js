
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Activate from './containers/Activate';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';
import Layout from './hocs/Layout'
import store from './store'
import Google from './containers/Google';
import Facebook from './containers/Facebook';
import Bewertung from './containers/Bewertung';
import BewertungSchreiben from './containers/BewertungSchreiben';
import Protected from './containers/Protected';
import { connect } from 'react-redux';
import Galery from './containers/Galery';
const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Switch>
          <Route exact path='/' component={Bewertung} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/login/:value' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/reset-password' component={ResetPassword} />
          <Route exact path='/google' component={Google} />
          <Route exact path='/facebook' component={Facebook} />
          <Route exact path='/bewertung' component={Bewertung} />
          <Route exact path='/bewertung-schreiben' component={BewertungSchreiben} />
          <Route exact path='/galery' component={Galery} />
          <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} isAuthenticated={null} />
          <Route exact path='/activate/:uid/:token' component={Activate} />

        </Switch>
      </Layout>
    </Router>
  </Provider>
)








export default App;
