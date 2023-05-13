import React, { useEffect, useState, useRef } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Session from "react-session-api";





function Testlogin(){

    const signup = document.getElementById("sign-up");
    const signin = document.getElementById("sign-in");
    const loginin = document.getElementById("login-in");
    const loginup = document.getElementById("login-up");

        signup.addEventListener("click", () => {
            loginin.classList.remove("block");
            loginup.classList.remove("none");

            loginin.classList.add("none");
            loginup.classList.add("block");
        })

        signin.addEventListener("click", () => {
            loginin.classList.remove("none");
            loginup.classList.remove("block");

            loginin.classList.add("block");
            loginup.classList.add("none");
        })


    return(
        // Login css 세트 1
        <div>
          <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'/>

                <div class="login">
                <div class="login__content">
                    <div class="login__img">
                    <img src="https://image.freepik.com/free-vector/code-typing-concept-illustration_114360-3581.jpg" alt="user login" />
                    </div>
                    <div class="login__forms">
                {/* <!--         login form --> */}
                    <form action="" class="login__register" id="login-in">
                        <h1 class="login__title">Sign In</h1>
                        <div class="login__box">
                        <i class='bx bx-user login__icon'></i>
                        <input type="text" placeholder="Username" class="login__input" />
                        </div>
                        <div class="login__box">
                        <i class='bx bx-lock login__icon'></i>
                        <input type="text" placeholder="Password" class="login__input" />
                        </div>
                        <a href="#" class="login__forgot">Forgot Password? </a>
                        
                        <a href="#" class="login__button">Sign In</a>
                        
                        <div>
                        <span class="login__account login__account--account">Don't Have an Account?</span>
                        <span class="login__signin login__signin--signup" id="sign-up">Sign Up</span>
                        </div>
                    </form>
                    
                    {/* <!-- create account form --> */}
                    <form action="" class="login__create none" id="login-up">
                        <h1 class="login__title">Create Account</h1>
                        <div class="login__box">
                        <i class='bx bx-user login__icon'></i>
                        <input type="text" placeholder="Username" class="login__input" />
                        </div>
                        
                        <div class="login__box">
                        <i class='bx bx-at login__icon'></i>
                        <input type="text" placeholder="Email" class="login__input" />
                        </div>
                        
                        <div class="login__box">
                        <i class='bx bx-lock login__icon'></i>
                        <input type="text" placeholder="Password" class="login__input" />
                        </div>
                        
                        <a href="#" class="login__button">Sign Up</a>
                        
                        <div>
                        <span class="login__account login__account--account">Already have an Account?</span>
                        <span class="login__signup login__signup--signup" id="sign-in">Sign In</span>
                        </div>
                        
                        <div class="login__social">
                        <a href="#" class="login__social--icon"><i class='bx bxl-facebook'></i></a>
                        <a href="#" class="login__social--icon"><i class='bx bxl-twitter'></i></a>
                        <a href="#" class="login__social--icon"><i class='bx bxl-google'></i></a>
                        <a href="#" class="login__social--icon"><i class='bx bxl-github'></i></a>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
        </div>
    )

}

export default Testlogin;
