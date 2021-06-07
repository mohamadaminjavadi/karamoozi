// import axios from 'axios'
import React from 'react'
import {useState, useEffect} from 'react'

export default function Register() {
    const [email, setemail] = useState('')
    const [student_id, setstudent_id] = useState('')
    const [name, setname] = useState('')

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/api/showprofile')
        .then(response=>{
            setData(response.data)
        })
    }, [])

    const SubmitFormOne= (e) =>{
        e.preventDefault();
        if(!name){
            alert('Please enter your name')
            return
        }
        if(!email){
            alert('Please enter email')
            return
        }
       if(!student_id){
            alert('Please enter student id')
            return
        }
        var object = {name,email, student_id}
        axios.post('http://localhost:8000/api/profilesubmit', object).then(response => {
            console.log(response.data);
        });
    }

    const SubmitFormTwo=(e)=>{
        e.preventDefault();

        axios.post('http://localhost:8000/api/deleteaccount').then(response => {
            console.log(response.data);
        })
    }



    return (
        <div className="col-md-8 container">
            <div className="card">
                <h5 className="card-header">
                    Edit Profile
                </h5>
                <form className="card-body" onSubmit={SubmitFormOne}>
                <div className="card-text">
                        name
                    </div>
                    <input
                    type="text" 
                    name="name" 
                    placeholder={data.name}
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
                    placeholder={data.email}
                    className="form-control"
                    value={email}
                    onChange={(e) =>setemail(e.target.value)}
                    />
                    <br />
                    <div className="card-text">
                        student id
                    </div>
                    <input 
                    type="text" 
                    name="student_id" 
                    placeholder={data.student_id}
                    className="form-control"
                    value={student_id}  
                    onChange={(e) =>setstudent_id(e.target.value)}
                    />
                    <br />
                    <button type="submit" className="btn btn-success submit">Save Changes</button>
                </form>
            </div>
            <div className="card">
                <div className="card-header">Delete Account</div>
                <form onSubmit={SubmitFormTwo} className="card-body">
                    <button type="submit" className="btn btn-danger">Delete Account</button>
                </form>
            </div>
            </div> 
    )
}














// -------------------------------------------



// import React,{useState, useEffect} from 'react'
// import axios from 'axios'

// export default function Profile() {

//     const [name, setname] = useState('')
//     const [email, setemail] = useState('')
//     const [student_id, setstudent_id] = useState('')
    
//     const onsubmit=(e)=>{
//         // add alerts
//         e.preventDefault();
//         var object = {name,email,student_id}
//         axios.post('http://localhost:8000/api/profilesubmit',object).then(response => {
//             console.log(response.data);
//         });
//     }

//     return (
//             <div className="container col-md-5">
//                 <div className="card">
//                     <h5 className="card-header">Profile</h5>
//                     <form className="card-body" onSubmit={onsubmit}>
//                         <div className="card-text">name</div>
//                         <input
//                             type="text"
//                             name="name"
//                             className="form-control"
//                             placeholder='name'  
//                             value={name}
//                             onChange={(e) =>setname(e.target.value)}
//                         />
//                     <br />
//                     <div className="card-text">email</div>
//                         <input
//                             type="email"
//                             name="email"
//                             className="form-control"
//                             placeholder='email'
//                             value={email}
//                             onChange={(e) =>setemail(e.target.value)}
//                         />
//                     <br />
//                     <div className="card-text">student id</div>
//                         <input
//                             type="text"
//                             name="student_id"
//                             className="form-control"
//                             placeholder='student id'
//                             value={student_id}
//                             onChange={(e) =>setstudent_id(e.target.value)}
//                         />
//                     <br />
//                     <button type="submit" className="btn btn-primary submit">Change!</button>
//                     </form>
//                 </div>
//             </div>
//     )
// }