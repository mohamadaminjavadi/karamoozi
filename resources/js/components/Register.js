// import axios from 'axios'
import React from 'react'
import {useState} from 'react'
import {Link,Switch, Route} from 'react-router-dom'
import Login from './Login'

export default function Register() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [password2, setpassword2] = useState('')
    const [student_id, setstudent_id] = useState('')
    const [name, setname] = useState('')

    const onsubmit= (e) =>{
        e.preventDefault();
        if(!name){
            alert('Please enter your name')
            return
        }
        if(!email){
            alert('Please enter email')
            return
        }
        if(!password){
            alert('Please enter password')
            return
        }
        if(!password2){
            alert('Please confirm your password')
            return
        }
        if(password!=password2){
            alert('check password and enter again')
            return
        }
        if(!student_id){
            alert('Please enter student id')
            return
        }
        var object = {name,email, password, student_id}
        axios.post('http://localhost:8000/api/register', object).then(response => {
            console.log(response.data);
        });
    }



    return (
        <div className="col-md-8 container">
            <div className="card">
                <h5 className="card-header">
                    Register
                </h5>
                <form className="card-body" onSubmit={onsubmit}>
                <div className="card-text">
                        name
                    </div>
                    <input
                    type="text" 
                    name="name" 
                    placeholder="name" 
                    className="form-control"
                    value={name}
                    onChange={(e) =>setname(e.target.value)}
                    />
                    <br />
                    <div className="card-text">
                        email
                    </div>
                    <input
                    type="email" 
                    name="email" 
                    placeholder="example@example.com" 
                    className="form-control"
                    value={email}
                    onChange={(e) =>setemail(e.target.value)}
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
                    value={password}
                    onChange={(e) =>setpassword(e.target.value)}
                    />
                    <br />
                    <div className="card-text">
                        confirm password
                    </div>
                    <input 
                    type="password" 
                    name="password2" 
                    placeholder="enter your password" 
                    className="form-control"
                    value={password2}
                    onChange={(e) =>setpassword2(e.target.value)}
                    />
                    <br />
                    <div className="card-text">
                        student id
                    </div>
                    <input 
                    type="text" 
                    name="student_id" 
                    placeholder="enter your student id" 
                    className="form-control"
                    value={student_id}  
                    onChange={(e) =>setstudent_id(e.target.value)}
                    />
                    <br />
                    <button type="submit" className="btn btn-success submit">Register</button>
                    <div className="card-footer">
                        already have an account? <Link to="/login">login</Link>
                        {/* link to login */}
                    </div>
                </form>
            </div>
            <Switch>
                <Route exact path="/login"  component={Login}/>
            </Switch>
        </div> 
    )
}
