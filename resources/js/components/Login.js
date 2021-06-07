import React from 'react'
import {useState} from 'react'
import {Link,Switch, Route} from 'react-router-dom'
import Register from './Register'
import api from '../util/api'
import {logIn} from '../util/auth'
import {useHistory} from 'react-router-dom'

export default function Login() {
    const [formInput, setFormInput] = useState({email:'',password:''})
    
    const updateFormInput = (e) => {
        e.persist()
        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    let History = useHistory();
    const onsubmit=(e)=>{
        e.preventDefault();
        
        
        api().get('/sanctum/csrf-cookie').then(() => {
            api().post('http://localhost:8000/login', formInput).then(response=>{
                if(response.data.error){
                    console.log(response.data.error)   
                }else{
                    if(logIn()){
                        History.push('/dashboard');
                    }
                }
            });
        });
    }



    return (
        <div className="col-md-8 container">
            <div className="card">
                <h5 className="card-header">
                    Login
                </h5>
                <form className="card-body" onSubmit={onsubmit}>
                    <div className="card-text">
                        email
                    </div>
                    <input
                    type="email" 
                    name="email" 
                    placeholder="example@example.com" 
                    className="form-control"
                    onChange={updateFormInput}
                    />
                    <br />
                    <div className="card-text">
                        password
                    </div>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder="enter your password" 
                    className="form-control"
                    onChange={updateFormInput}
                    />
                    <br />
                     <div className="card-text">
                        Remember me
                    </div>
                    <input 
                    type="checkbox"
                    name="remember"
                    onChange={updateFormInput}
                    />
                    
                    <br /> 
                    <button type="submit" className="btn btn-success submit">Login</button>
                    <div className="card-footer">
                        don't have an account? <Link to="/register">register</Link>
                        {/* link to register */}
                    </div>
                </form>
            </div>
            <Switch>
                <Route exact path="/register" component={Register} />
            </Switch>
        </div>
    )
}
