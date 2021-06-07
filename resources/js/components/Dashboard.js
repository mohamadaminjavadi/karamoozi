import React,{useState, useEffect} from 'react'
// import axios from 'axios'

export default function Dashboard() {

    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/api/showprofile')
        .then(response=>{
            setData(response.data)
        })
    }, [])


    return (
        <>
        this is dashboard
        </>
    )
}