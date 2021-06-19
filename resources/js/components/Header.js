import React,{useState, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
export default function Header() {
    
    return (
        <div>
            <br /><br />
            <Login />


            {/* 
                register route, and it's functions must be deleted after we connect to golestan
                it is just for making fake users to test the app
            */}

            <Switch>
                <Route exact path="/register"  component={Register}/>
            </Switch>
            
        </div>
    )
}
