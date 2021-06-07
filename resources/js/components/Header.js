import React,{useState, useEffect} from 'react'
import {Link,Switch, Route} from 'react-router-dom'
// import  { Redirect } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import Dashboard from './Dashboard'
import {Dropdown} from 'react-bootstrap'
// import { logOut } from '../util/auth'

export default function Header() {

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/api/showprofile')
        .then(response=>{
            setData(response.data)
        })
    }, [])
    // check if user is logged in then show profile, else show login and register

    const [redirect, setRedirect] = useState('')
    if(redirect){

    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    
                    {/* پروفایل فقط وقتی کاربر وارد شده نشان داده شود */}
                    <li className="nav-item">
                    <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        {data.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item><Link className="nav-link" to="/profile">Profile</Link></Dropdown.Item>
                        <Dropdown.Item>
                            <form>
                                <input type="submit" className="btn btn-danger" value="logout"/>
                            </form>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </li>
                    {/* تا اینجا */}

                    <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>

            <Switch>
                <Route exact path="/login"  component={Login}/>
                <Route exact path="/register"  component={Register}/>
                <Route exact path="/profile"  component={Profile}/>
                <Route exact path="/dashboard"  component={Dashboard}/>
            </Switch>
            
        </div>
    )
}
