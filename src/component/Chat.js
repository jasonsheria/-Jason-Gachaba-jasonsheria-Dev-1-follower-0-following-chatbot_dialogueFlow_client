// Filename - component/home.js

import { Link } from 'react-router-dom';

import './chat.css';
import axios from 'axios'
import { redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import Muse from "./Whatsapp-Message.mp3";
import { Howl, Howler } from 'howler';
// import './styles.css';
function Home() {
    const [data, setDatas] = useState([]);
    const [show, setShow] = useState(false);
    const [closes, setCloses] = useState(null);
    const [box, setBox] = useState(null);
    const [message, setMessage] = useState(null);
    const [user, setUser] = useState(null);
    const [entete, setEntete] = useState('hide_b');
    const [isLoggedIn, setisLoggedIn] = useState(false);

    const navigate = useNavigate();
    function getUserFunction() {
        let bearer = 'Bearer ' + (localStorage.getItem('Loggin'));
        axios.get(process.env.REACT_APP_BACKEND+"/api/me",
            {

                headers: { "Authorization": bearer }
            }

        )
            .then((response) => {
                const fetchd = response.data
                setUser(fetchd)
                console.log(fetchd.username)
            })
            .catch((error) => {
                console.log("meesages " + error)
            })
    }

    function getMessageFunction() {
        let bearer = 'Bearer ' + (localStorage.getItem('Loggin'));
        axios.get(process.env.REACT_APP_BACKEND+"/api/getMessage",
            {

                headers: { "Authorization": bearer }
            }

        )
            .then((response) => {

                const fetchd = response.data
                console.log(fetchd)

                setDatas(fetchd)


            })
            .catch((error) => {
                console.log("messages " + error)
            })
        console.log(data)

    }
    function Aud() {
        const sound = new Howl({
            src: Muse,
        });
        sound.play();
    }
    useEffect(() => {
        const loggedInUser = localStorage.getItem('Loggin');
        const loggedInUserInfo = localStorage.getItem('user');


        if (!loggedInUser) {
            navigate('/login')
        } else {
            setisLoggedIn(true);
        };

        getUserFunction();
        getMessageFunction();
    }, []);
    const [display, setDisplay] = useState('hide_modal')
    const handlerClose = () => {
        closes == null ? setCloses('show-modal') : setCloses(null);
    }
    const handlehide = () => {
        setShow(false);

    }
    const handleshow = () => {
        setShow(true);
    }
    const handleLogout = () => {
        localStorage.removeItem('Loggin');
        setisLoggedIn(false)
        navigate('/login')
    }
    const handleSend = async e => {
        e.preventDefault();
        let bearer = 'Bearer ' + (localStorage.getItem('Loggin'));
        if (message) {
            const user = { message, token: bearer };
            await axios.post(
                process.env.REACT_APP_BACKEND+"/api/send",
                user
            )
                .then((response) => {
                    const fetchd = response.data
                    setMessage("")
                    Aud();
                    Howler.volume(0.5);
                    // console.log(fetchd)
                })
                .catch((error) => {
                    console.log("meesages " + error)
                })
            getMessageFunction();

        }

    }
    function handlerbox() {
        box == null ? setBox('chats_hide') : setBox(null);
        entete == null ? setEntete('hide_b') : setEntete(null);
    }

    const datas = data != [] ? data.map((element, index) => {
        if (element.type == 1) {
            return (
                <>
                    <div class="userSays">
                        <div class="text">
                            <p>{element.content}</p>
                        </div>
                    </div>
                </>
            );

        } else {
            return (
                <>
                    <div class="text-box-santa">
                        <div class="text">
                            <p>{element.content}</p>
                        </div>
                    </div>
                </>
            );

        }




    })
        :

        <>
            <div class='text-box-santa'><div class='text'><p> Why can i help you {user ? user.username : ""}? </p></div></div>
        </>;
    return <>
        <nav>

            <label for="name" id="logo-text">
                <a href="#">ENA DRC</a>
            </label>

            <input type="checkbox" id="check" />
            <label for="check" ClassNameName="toggle">
                <i ClassNameName="fa-solid fa-bars-staggered"></i>
            </label>

            <ul>
                <li><a href="#" ClassNameName="active">Home</a></li>
                <li><a href="#">Features</a></li>

                <li><a href="#">Contact US</a></li>
                <li><a href="#">About</a></li>
            </ul>

            <div id="account-container">
                {
                    isLoggedIn ?
                        <>
                            <a href="#" onClick={handleLogout}>Logout</a>
                        </>
                        :
                        <>
                            <a href="#">Register</a>
                            <Link to='/login'>Login</Link>
                        </>

                }


            </div>
        </nav>

        <header>
            <div id="header-container">
                <div id="header-page-title">
                    <h1>PLATFORM
                        RECRUITMENT </h1>
                    <p>the platform supports you during all the Recruitment processes
                        <br /> You can learn more by submitting a request
                    </p>
                    <div id="header-subscribe-form">
                        <input type="email" name="" id="" placeholder="Enter your email" />
                        <input type="submit" value="Subscribe" />
                    </div>
                </div>
                <div id="header-page-image">
                    <img src={require('./image/Recrutement-en-Afrique.jpg')} alt="" />
                </div>
            </div>
        </header>











        {/* chat */}
        <button className='chatbox' onClick={() => { handlerbox() }}>
            <p>chatbox</p>
        </button>
        <div className={'chats ' + box}>
            <div className={'heads ' + entete}>
                <div >
                    <img src={"https://img.freepik.com/free-vector/funny-santa-claus-celebrating-christmas_74855-962.jpg"} alt="" className='profile' />

                    <span className='name'>  {user ? user.username : " "}  <span></span> </span>
                </div>
            </div>
            <div className="santaSays">

                <div class='text-box-santa'><div class='text'><p> Why can i help you {user ? user.username : ""}? </p></div></div>

                {
                    isLoggedIn ?

                        datas
                        :
                        <>
                            <h3>
                                please Loggin first here <Link to='/login'>Login</Link>
                            </h3>
                        </>
                }
                <div class="message-indicator" style={{ display: show ? 'flex' : 'none' }}>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </div>
            </div>

            <hr />
            <div className="message-box">
                <div className={"message-input " + entete}>
                    <input id="inputText" type="text" value={message} onChange={(e) => setMessage(e.target.value)} onFocus={handleshow} onMouseLeave={handlehide} placeholder="What can I help you with?" />
                    <button style={{ border: "none", background: 'transparent' }}>
                        <AiOutlineSend onClick={handleSend} />

                    </button>
                </div>

            </div>
        </div >

    </>;
}

export default Home;
