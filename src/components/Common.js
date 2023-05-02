import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate  } from "react-router-dom";
import axios from 'axios';

import styles from "./asset/css/common.module.css"

function Common(){
    const navigate = useNavigate();

    const login = JSON.parse(localStorage.getItem("login"));
    const id = login.id;

    const [eduCode, setEduCode] = useState([]);
    const [userEdu, setUserEdu] = useState(
        localStorage.getItem("userEdu")
    );

    function getEduCode(){
        axios.get("http://localhost:3000/homeEduCode", { params:{ "id":id }})
        .then(function(resp){
            console.log(resp.data);
            setEduCode(resp.data);
        })
        .catch(function(err){
            alert("err");
            console.log(err);
        })
    }
    function handleUserEdu(e){
        setUserEdu(e.target.value);
        localStorage.setItem("userEdu", e.target.value);
    }
    function logout(){
        localStorage.removeItem("login");
        alert("로그아웃되었습니다");
        navigate("/");
    }
    console.log(eduCode);
    console.log(userEdu);

    useEffect(function(){
        getEduCode();
    },[id]);

    return(
        <div className={styles.homeWrap}>
            <header>
                <div className={styles.headerTopBg}>

                    <div className={`${styles.headerTop} ${styles.search}`}>  
                        <select value={userEdu} onChange={handleUserEdu}>
                            {eduCode.map(function(edu, i){
                                return(
                                    <option value={edu.eduCode} key={i}>({edu.eduCode}){edu.eduName}</option>
                                )
                            })}
                        </select>
                        <Link to="/cheesefriends/testmain">마이페이지</Link>
                        <button onClick={logout}>로그아웃</button>
                    </div>
                </div>
                <div className={styles.headerBottom}>
                    <h1>
                        <Link to="/cheesefriends/home"><img src="/img/logo100h.png" alt="cheeseFriends"/></Link>
                    </h1>
                    <nav className={styles.mainMenu}>
                        <ul>
                            <li>
                                <Link to="/cheesefriends/learning">학습자료실</Link>
                            </li>
                            <li>
                                <Link to="/cheesefriends/lecture">강의실</Link>
                            </li>
                            <li>
                                <Link to="/cheesefriends/learning/EduInfoList">교육정보</Link>
                            </li>
                            <li>
                                <Link to="/cheesefriends/playgame">쉼터</Link>
                            </li>
                            <li>
                            <Link to="/cheesefriends/service/ServiceList">고객센터</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                <p className={styles.copyright}>Copyright 2023. cheeseFriends All rights reserved.</p>
            </footer>
        </div>
    )
}
export default Common