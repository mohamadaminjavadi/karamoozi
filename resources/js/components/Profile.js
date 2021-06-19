import axios from 'axios'
import {useState, useEffect, React} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect, withRouter} from 'react-router-dom'
import SuccessMsg from './SuccessMsg'

const Profile = ({history}) => {
    const [email, setemail] = useState('')
    const [student_number, setstudent_number] = useState('')
    const [name, setname] = useState('')
    const [last_name, setlast_name] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState('')
    const [telegram, settelegram] = useState('')
    const [submitStatus, setsubmitStatus] = useState(false)

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/api/userdata')
        .then(response=>{
            setData(response.data)
            setname(response.data.name)
            setstudent_number(response.data.student_number)
            setlast_name(response.data.last_name)

            let student_number = response.data.student_number
            let object = {student_number}
            axios.post('http://localhost:8000/api/signupcheck',object)
            .then(response=>{
                setsubmitStatus(response.data.submitted)
            })
        })
    }, [])

    const SubmitFormOne= (e) =>{
        e.preventDefault();
        if(!student_number || !last_name || !name){
            alert('لطفا وارد سیستم شوید')
            return
        }
        if(!email){
            alert('لطفا ایمیل خود را وارد کنید')
            return
        }
        if(!address){
            alert('لطفا آدرس خود را وارد کنید')
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
        var object = {name,last_name,email, student_number,address,phone,telegram}
        axios.post('http://localhost:8000/api/profilesubmit', object).then(response =>{
            if(response.data.success){
                alert('ثبت نام در سیستم با موفقیت انجام شد. در صورت ثبت نمره اطلاع رسانی خواهد شد')
                // <Redirect to='/successmsg'/> MUST redirect to successmsg cmpnnt
                history.push('/successmsg');
                location.assign('/successmsg');
                // return <SuccessMsg />
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
                    onChange={(e) =>setemail(e.target.value)}
                    />
                    <br />
                    <div className="card-text">
                        آدرس منزل
                    </div>
                    <input
                    type="text" 
                    name="address" 
                    placeholder={data.address}
                    className="form-control"
                    value={address}
                    onChange={(e) =>setaddress(e.target.value)}
                    />
                    <br />
                    <div className="card-text">
                        شماره واتساپ
                    </div>
                    <input
                    type="text" 
                    name="phone" 
                    placeholder="whatsapp phone number"
                    className="form-control"
                    value={phone}
                    onChange={(e) =>setphone(e.target.value)}
                    />
                    <br />
                    <div className="card-text">
                        آیدی تلگرام
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
                    <Route exact path="/successmsg" component={SuccessMsg} />
                </Switch>
            </Router>
            </div>
    )
    }
}
export default withRouter(Profile);