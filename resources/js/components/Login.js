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
                        axios.post('http://ssl.qom.ac.ir/grade_announcer/Kevin/public/api/signupcheck',formInput).then(response=>{
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
        return <Profile data={data} />
    }
}
