// Filename - component/home.js

import React, { useEffect, useState } from "react";
import './styles.css';
import axios from 'axios';
import { redirect,useNavigate } from "react-router-dom";
function Login() {

    const [hide, SetHide] = useState(true);
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState('');

    const [name, setName] = useState(null);
    const [email2, setEmail2] = useState(null);
    const [password2, setPassword2] = useState(null);
    const [user, setUser] = useState(null)
    const [isLoggedIn, setisLoggedIn]=useState(false);
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
      };
    function handlerCount() {
        SetHide(!hide)
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const user = { name, email:email2, password:password2 };
        const response = await axios.post(
            process.env.REACT_APP_BACKEND+"/api/register",
            user,axiosConfig
        );
        // set the state of the user
        setUser(response.data)
        // store the user in localStorage
        localStorage.setItem('user', response.data.user)
        if(response.data.user){
            setEmail2('');
            setPassword2('');
            handlerCount();
        }else{

        }

    }
    const handleSubmit2 = async e => {

        e.preventDefault();

        const user = {  email:email, password:password};
        const response = await axios.post(
            process.env.REACT_APP_BACKEND+"/api/login",
            user,axiosConfig
        );
        // set the state of the user
        setUser(response.data)
        // store the user in localStorage

        localStorage.setItem('user', response.data.user)
        console.log( response.data.token)
       
        if(response.data.token){
            setEmail("");
            setPassword('');
            localStorage.setItem('Loggin', response.data.token)
            console.log(localStorage.getItem('user'))
             navigate('/')
        }

    };
    useEffect(()=>{
        const loggedInUser=localStorage.getItem('Loggin');
        if( loggedInUser){
            navigate('/')
        }
    })
    
    return <>
        <main>
            <div class="circle"></div>
            <div class="register-form-container">
                <form action="" style={{ display: hide ? 'inline' : 'none' }} className="form" onSubmit={handleSubmit2}>
                    <h1 class="form-title">
                        AUTHENTIFICATION
                    </h1>
                    <div class="form-fields">
                        {/* <div class="form-field">
            <input type="text" placeholder="Name" required pattern="[a-zA-Z]+" title="Name can only contain letters."/>
          </div> */}
                        <div class="form-field">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                        </div>
                        <div class="form-field">
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required minlength="8" maxlength="128" />
                        </div>
                    </div>
                    <div class="form-buttons">
                        <button class="button"

                        >CONNECTION</button>
                        <div class="divider">ou</div>
                        <a href="#" class="button button-google"
                            onClick={() => { handlerCount() }}
                        >creer compte</a>
                    </div>
                </form>

                {/* register form*/}

                <form action="" style={{ display: hide ? 'none' : 'inline' }} className="form" onSubmit={handleSubmit}>
                    <h1 class="form-title">
                        ENREGISTREZ-VOUS
                    </h1>
                    <div class="form-fields">
                        <div class="form-field">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name & Lastname"  title="Name can only contain letters." />
                        </div>

                        <div class="form-field">
                            <input type="email" value={email2} onChange={(e) => setEmail2(e.target.value)} placeholder="Email" required />
                        </div>
                        <div class="form-field">
                            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Password" required minlength="8" maxlength="128" />
                        </div>
                    </div>
                    <div class="form-buttons">
                        <button class="button"

                        >ENREGISTRER</button>
                        <div class="divider">ou</div>
                        <a href="#" class="button button-google"
                            onClick={() => { handlerCount() }}
                        >connection</a>
                    </div>
                </form>
            </div>
        </main>

    </>;
}

export default Login;
