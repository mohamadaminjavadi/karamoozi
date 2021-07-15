import axios from 'axios'
import api from '../util/api'
import {useState, useEffect, React} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect, withRouter} from 'react-router-dom'
import SuccessMsg from './SuccessMsg'


const Profile = (props) => {
    const [email, setemail] = useState('')
    const [student_number, setstudent_number] = useState('')
    const [name, setname] = useState('')
    const [last_name, setlast_name] = useState('')
    const [phone, setphone] = useState('')
    const [telegram, settelegram] = useState('')
    const [submitStatus, setsubmitStatus] = useState(false)
    const [data, setData] = useState([])
    const [PhoneisValid, setPhoneisValid] = useState(false)
    const [TelisValid, setTelisValid] = useState(false)

    useEffect(() => {
        setData(props.data)
        setname(props.data.name)
        setstudent_number(props.data.student_number)
        setlast_name(props.data.last_name)

        let student_number = props.data.student_number
        let object = {student_number}
        let token = document.head.querySelector('meta[name="csrf-token"]');
        api().post('http://ssl.qom.ac.ir/grade_announcer/Kevin/public/api/signupcheck',object)
        .then(response=>{
            setsubmitStatus(response.data.submitted)
        })
    }, [])

    const updatePhone=(e)=>{
        e.persist()
        const regEx =/^[9][8][9]\d{9}$/;
        if(e.target.value.match(regEx)){
            (e) =>setphone(e.target.value)
            setPhoneisValid(true);
        }
        else{
            setPhoneisValid(false);
        }
    }

    const updateTelegram=(e)=>{
        e.persist()
        const regEx2 =/^@\w*$/;
        if(e.target.value.match(regEx2)){
            (e) =>settelegram(e.target.value)
            setTelisValid(true);
        }
        else{
            setTelisValid(false);
        }
    }

    const SubmitFormOne= (e) =>{
        e.preventDefault();
        if(!TelisValid){
            alert('لطفا آیدی تلگرام را به درستی وارد کنید\nمثال:@example')
            return
        }
        if(!PhoneisValid){
            alert('لطفا شماره تلفن را به درستی وارد کنید\nمثال:989191234567')
        }
        if(!student_number || !last_name || !name){
            alert('لطفا وارد سیستم شوید')
            return
        }
        if(!email){
            alert('لطفا ایمیل خود را وارد کنید')
            return
        }
        if(!phone){
            alert('لطفا شماره تلفن واتساپ خود را وارد کنید')
            return
        }
        if(!telegram){
            alert('لطفا آیدی تلگرام خود را وارد کنید')
            return
        }
        var object = {name,last_name,email, student_number,phone,telegram}
        let token = document.head.querySelector('meta[name="csrf-token"]');
        api().post('http://ssl.qom.ac.ir/grade_announcer/Kevin/public/api/profilesubmit', object).then(response =>{
            if(response.data.success){
                alert('ثبت نام در سیستم با موفقیت انجام شد. در صورت ثبت نمره اطلاع رسانی خواهد شد')
                location.assign('http://ssl.qom.ac.ir/grade_announcer/Kevin/public/successmsg');
            }
        })
    }


    if(submitStatus){
        return <SuccessMsg />
    }
    else{
        
    return (
        <div className="col-md-8 container">
            <div className="card" dir="rtl">
                <h5 className="card-header">
                    اطلاعات دانشجو
                </h5>
                <form className="card-body" onSubmit={SubmitFormOne}>
                     <div className="card-text">
                        نام: {data.name}
                    </div>
                    <br />
                    <div className="card-text">
                        نام خانوادگی: {data.last_name}
                    </div>
                    <br />
                    <div className="card-text">
                        شماره دانشجویی: {data.student_number}
                    </div>
                    <br />
                    لطفا فرم زیر را با دقت کامل کنید <br /><br />
                    <div className="card-text">
                        ایمیل
                    </div>
                    <input
                    type="email" 
                    name="email" 
                    placeholder='mail@gmail.com'
                    className="form-control"
                    value={email}
                    onChange={updateTelegram}
                    />
                    <br />
                    <div className="card-text">
                        شماره واتساپ (به این صورت: 989191234567)
                    </div>
                    <input
                    type="text" 
                    name="phone" 
                    placeholder="whatsapp phone number"
                    className="form-control"
                    value={phone}
                    onChange={updatePhone}
                    />
                    <br />
                    <div className="card-text">
                        آیدی تلگرام (به این صورت: @example)
                    </div>
                    <input
                    type="text" 
                    name="telegram" 
                    placeholder="telegramid@"
                    className="form-control"
                    value={telegram}
                    onChange={(e) =>settelegram(e.target.value)}
                    />
                    <br />
                    <button type="submit" className="btn btn-success submit">ذخیره</button>
                </form>
            </div>
            <Router>
                <Switch>
                    <Route exact path="http://ssl.qom.ac.ir/grade_announcer/Kevin/public/successmsg" component={SuccessMsg} />
                </Switch>
            </Router>
            </div>
    )
    }
}
export default withRouter(Profile);