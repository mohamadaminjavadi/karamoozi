// import axios from 'axios'
import React from 'react'
import {useState} from 'react'

export default function Register() {
    const [password, setpassword] = useState('')
    const [password2, setpassword2] = useState('')
    const [student_number, setstudent_number] = useState('')
    const [name, setname] = useState('')
    const [last_name, setlast_name] = useState('')

    const onsubmit= (e) =>{
        e.preventDefault();
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
        if(!student_number){
            alert('Please enter student id')
            return
        }
        var object = {student_number,password,name,last_name}
        axios.post('http://localhost:8000/api/register', object).then(response => {
            console.log(response.data);
        });
    }



    return (
        <div className="col-md-8 container">
            <div className="card">
                <h5 className="card-header">
                    ثبت نام
                </h5>
                <form className="card-body" onSubmit={onsubmit}>
                    <div className="card-text">
                        شماره دانشجویی
                    </div>
                    <input 
                    type="text" 
                    name="student_number" 
                    placeholder="enter your student id" 
                    className="form-control"
                    value={student_number}  
                    onChange={(e) =>setstudent_number(e.target.value)}
                    />
                    <br />
                    <div className="card-text">
                        رمز عبور
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
                        تایید رمز عبور
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
                        نام
                    </div>
                    <input 
                    type="text" 
                    name="name" 
                    placeholder="enter your name" 
                    className="form-control"
                    value={name}
                    onChange={(e) =>setname(e.target.value)}
                    />
                    <br />
                    <div className="card-text">
                        نام خانوادگی
                    </div>
                    <input 
                    type="text" 
                    name="last_name" 
                    placeholder="enter your last name" 
                    className="form-control"
                    value={last_name}
                    onChange={(e) =>setlast_name(e.target.value)}
                    />
                    <br />
                    
                    <button type="submit" className="btn btn-success submit">Register</button>
                </form>
            </div>
        </div> 
    )
}
