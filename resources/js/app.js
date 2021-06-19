/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/Index');
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import SuccessMsg from './components/SuccessMsg'
import Index from './components/Index'
import React from 'react'

if (document.getElementById('app')) {
    ReactDOM.render(<Router><Index /></Router>, document.getElementById('app'));
}
<Router>
    <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/successmsg" component={SuccessMsg} />
    </Switch>
</Router>


