import {useState} from 'react'  
import api from '../util/api'
import {logIn} from '../util/auth'
import SucessMsg from './SuccessMsg'
import Profile from './Profile'
import Cookies from 'js-cookie';


export default function Login() {
    const [formInput, setFormInput] = useState({student_number:'',password:''})
    const [submitStatus, setsubmitStatus] = useState(false)
    const [loginStatus, setloginStatus] = useState(false)
    const [data, setdata] = useState({})
    const [username, setusername] = useState({})
    const [password, setpassword] = useState({})
    const [isValid, setisValid] = useState(false)
    
    const updateUsername=(e)=>{
        e.persist()
        
        const regEx =/^[0-9]\d{9}$/;
        if(e.target.value.match(regEx)){
            (e) =>setusername({[student_number]: e.target.value})
            setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
            setisValid(true);
        }
        else{
            setisValid(false);
        }
    }
    const updatePassword=(e)=>{
        e.persist();
        (e) =>setusername(e.target.value)
        setFormInput(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }
    const onsubmit=(e)=>{
        e.preventDefault();
        if(!isValid){
            alert('شماره دانشجویی وارد شده اشتباه است')
            return
        }
        if(!formInput.student_number){
            alert('لطفا شماره دانشجویی خود را وارد کنید')
            return
        }
        if(!formInput.password){
            alert('لطفا رمز سیستم گلستان خود را وارد کنید')
            return
        }
        let token = document.head.querySelector('meta[name="csrf-token"]');
            api().post('http://ssl.qom.ac.ir/grade_announcer/Kevin/public/login', formInput,{
                expires: 86400, sameSite: 'lax',
                headers:{
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': token.content,
                }
            }).then(response=>{
                // اینجا باید به ای پی آیی پست کنیم که دیتارو میگیره و بهمون پروفایل بر میگردونه
                setdata(response.data);
                if(response.data.error){
                    alert('شماره دانشجویی و رمز عبور خود را مجددا بررسی نمایید')
                    return
                }else{
                    if(logIn()){
                        setloginStatus(true);
                        api().post('http://ssl.qom.ac.ir/grade_announcer/Kevin/public/api/signupcheck',formInput).then(response=>{
                            setsubmitStatus(response.data.submitted)
                        })
                    }
                }
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
                    onChange={updateUsername}
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
                    onChange={updatePassword}
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
        return <Profile data={data} />
    }
}
