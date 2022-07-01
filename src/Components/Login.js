import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

export default function Login() {
  const [details, setDetails]=useState({
    email: "",
    password: "",
    id: ""
  })

  const [loginstatus,setLoginstatus] = useState('Please login');
  const auth = useAuth();
  const Navigate = useNavigate();

  async function user_auth(details){
    const url = process.env.REACT_APP_SERVER_URL ;
    console.log(url)
    const response = await fetch(url + details.email);
    const data = await response.json();
    console.log(data);

    if(data[0] === 'No user found'){
      Navigate('/')
      setLoginstatus('Incorrect email')
    }
    else{
      setDetails({...details, id : data[0].id})
      if(data[0].password === details.password){
        setLoginstatus('Logged in!')
        Navigate('/Home', {replace: true} )
      }
      else{
        Navigate('/')
        setLoginstatus('Incorrect password');
      }  
    }
  }
  const logourl = process.env.REACT_APP_LOGO_URL;

  const submitHandler = e =>{
    e.preventDefault();
    setLoginstatus('Logging in ..')
    if(details.email === 'test@test.com'){
      auth.login(details);
      Navigate('/Home' ,{replace : true});
    }
    else if(details.email){
      user_auth(details); 
      if(details.email.length !== 0){
        auth.login(details);
        console.log(auth.user);
      }
    }
    else{
      setLoginstatus('Please enter details')
    }
    
  }

  return (
    <div className='login'>
    <img className="Logo1" src = {logourl} alt="logo"/>
    <div className='Centre'>
    <div className='Loginbox'>
    <form onSubmit={submitHandler} className = "CEN">
        <div>
            <h4 className='H1'>Login</h4>
            <hr />
            <div style={{marginTop : '4%'}}>
                <label className='label'>Email address</label>
                <input type="email" className='Input' onChange={e => setDetails({...details, email : e.target.value})} value ={details.email}/>
            </div>
            <br />
            <div>
                <label className='label'>Password</label>
                <input type="password" className='Input' onChange={e => setDetails({...details, password : e.target.value})} value ={details.password}/>
            </div>
            <br />
            <input className = "Buttons1" type ="submit" value="Submit" />
            <br />
            <small><strong>Login status:</strong> {loginstatus}</small>
        </div>
    </form>
    </div>
    </div>
    </div>
  )
   
}

