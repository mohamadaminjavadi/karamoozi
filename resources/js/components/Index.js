import React from 'react';
import Header from './Header';
import Login from './Login'
import SuccessMsg from './SuccessMsg'
import {BrowserRouter as Router, Switch, Route,Link} from 'react-router-dom'


function Index() {
    return (
        <div className="container">
            <Header/>

            <Router>
                <Switch>
                    <Route exact path="/successmsg" component={SuccessMsg} />
                </Switch>
            </Router>
            
        </div>
    );
}

export default Index;