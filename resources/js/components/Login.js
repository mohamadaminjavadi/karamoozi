import {useState} from 'react'  
import api from '../util/api'
import {logIn} from '../util/auth'
import SucessMsg from './SuccessMsg'
import Profile from './Profile'


export default function Login() {
    const [formInput, setFormInput] = useState({student_number:'',password:''})
    const [submitStatus, setsubmitStatus] = useState(false)
    const [loginStatus, setloginStatus] = useState(false)
    const updateFormInput = (e) => {
        e.persist()
        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const onsubmit=(e)=>{
        e.preventDefault();
        if(!formInput.student_number){
            alert('لطفا شماره دانشجویی خود را وارد کنید')
            return
        }
        if(!formInput.password){
            alert('لطفا رمز سیستم گلستان خود را وارد کنید')
            return
        }
        api().get('/sanctum/csrf-cookie').then(() => {
            api().post('http://localhost:8000/login', formInput).then(response=>{
                // اینجا باید به ای پی آیی پست کنیم که دیتارو میگیره و بهمون پروفایل بر میگردونه
                if(response.data.error){
                    alert('شماره دانشجویی و رمز عبور خود را مجددا بررسی نمایید')
                    return
                }else{
                    if(logIn()){
                        setloginStatus(true);
                        axios.post('http://localhost:8000/api/signupcheck',formInput).then(response=>{
                            setsubmitStatus(response.data.submitted)
                        })
                    }
                }
            });
        });
    }

    if(!loginStatus){
    return (
        <div className="col-md-8 container">
            <div className="card" dir="rtl">
                <h5 className="card-header">
                    ورود به سیستم
                </h5>
                <form className="card-body" onSubmit={onsubmit}>
                    <div className="card-text">
                        شماره دانشجویی
                    </div>
                    <input
                    type="text" 
                    name="student_number"
                    placeholder="9913123456" 
                    className="form-control"
                    onChange={updateFormInput}
                    />
                    <br />
                    <div className="card-text">
                        رمز عبور
                    </div>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder="رمز عبور" 
                    className="form-control"
                    onChange={updateFormInput}
                    />
                    <br />
                    <br /> 
                    <button type="submit" className="btn btn-success submit">ورود</button>
                </form>
            </div>
            
        </div>
    )
    }
    if(submitStatus){
        return <SucessMsg />
    }
    else{
        return <Profile />
    }
}
