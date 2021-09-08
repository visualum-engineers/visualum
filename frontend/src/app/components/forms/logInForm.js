/* 
Notes on whats missing:
    //Backend
        1. Verifying email code on server side
        2. Google Sign up server authentication 

    //Frontend 
        4. Specific password user feedback requirements
        5. Error message when button is clicked and user
                - hasnt filled anything out, 
                - has invalid information 
        6. Reset Password Feature
        (Optional) 
                - star twinkling animation on background on signup form. 
                - Can be built with css 
*/

import React, { Component } from 'react';
import Buttons from './buttons';
import InputCode from './inputCode';

const emailRegex = /.+@.+[.]{1}.+/;
const numberRegex =/[0-9]{6,}/;

//piece-wise regex expression for password
const passwordLength = /.{8,20}/
const passwordUpperCase = /^(?=.*[A-Z]).*$/
const passwordLowerCase = /^(?=.*[a-z]).*$/
const passwordNumbers = /^(?=.*[0-9]).*$/
const passwordSymbols = /^(?=.*[!@#$%^&*]).*$/
const passwordRegexCollection = [passwordLength, passwordUpperCase, passwordLowerCase, passwordNumbers, passwordSymbols]

function passwordCheck(statePW, passwordRegexCollection, btnCheck=false){
    let passwordCheckArr = [...passwordRegexCollection]
    let testSpecificPwRegex = []
    if(btnCheck) return passwordCheckArr.every(regex => regex.test(statePW))

    for (let i in passwordCheckArr){
        testSpecificPwRegex.push(passwordCheckArr[i].test(statePW))
    }
    return testSpecificPwRegex
}

const initialState = {
    accountType:"student",
    formPage: 1,
    googleLogIn: "",
    email: "",
    password:"",
    twoFactorLogin: "",
    rememberMe:false,
    error: false,
}

class GoogleLogin extends Component {
    //Google button library
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);
    }

    render() {
        return (
            <div className="mt-4 align-self-center">
                <button className="mb-2 google-btn">
                    <div id="g_id_onload"
                        data-client_id="297543839155-cclc3bsf6m26pfaj1bmrfb1l4bgpcin7.apps.googleusercontent.com"
                        data-context="signin"
                        data-ux_mode="popup"
                        data-login_uri="http://localhost:3001">
                    </div>

                    <div className="g_id_signin"
                        data-type="standard"
                        data-shape="rectangular"
                        data-theme="outline"
                        data-text="signin_with"
                        data-size="large"
                        data-logo_alignment="left">
                    </div>
                </button>
            </div>
        )
    }
}

class ManualLogin extends Component {
    render() {
        return (<div>
            <div className="form-floating mt-3">
                <input 
                    placeholder ="Email Address"
                    value ={this.props.email}
                    data-state="email"
                    onChange={this.props.handleChange}
                    type="email" 
                    className="form-control" 
                    id="email" 
                    aria-describedby="emailHelp"/>
                <label htmlFor="email" className="form-label">Email Address</label>
            </div>
            <div className= "mb-3 mt-3 flex-fill form-floating">
                <input
                    placeholder="Password"
                    value ={this.props.password}
                    onFocus={this.props.handleFocus}
                    data-state="password"
                    onChange={this.props.handleChange} 
                    type="password" 
                    className="form-control" 
                    id="password"/>
                <label htmlFor="password" className="form-label">Password</label>
            </div>
            <div className="mb-3 form-check">
                <input
                    data-state="rememberMe"
                    onChange={this.props.handleChange} 
                    type="checkbox" 
                    className="form-check-input" 
                    id="rememberMe"/>
                <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
            </div>
        </div>
        )
    }
}
//for verification of code, prevents update of state.
//may replace with react hooks 
//for a cleaner verison in future
let loading = false 
class TwoFactorLogin extends Component {
    render() {
        return (
        <InputCode length={6}
            label="Verify your Identity"
            description = {`Input 6-digit code sent to: ${this.props.email}`}
            onComplete={code => {
            if(loading !== true){
                loading = true
                this.props.handleChange(code)
                }
                //implent a way to also disable inputs... for future after 10 seconds
                setTimeout(() => loading = false, 10000)
            }}
        />
        )
    }
}

class CurrentLogInPage extends Component {
    render() {
        //organizes pages to be easily searched through
            const formPage= {
                    1: <GoogleLogin {...this.props}/>,
                    2: <ManualLogin {...this.props}/>,
                    "final": <TwoFactorLogin {...this.props}/>
                }
        //returns appropiate form page
        return formPage[this.props.formPage]
    }
}

export default class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.mounted = true;
    }
    
    clearState(){
        this.setState(initialState);
    }

    //form page navigation behavior
    moveToNextPage(){
        this.setState((state) => {
            const page2Input = emailRegex.test(state.email) && passwordCheck(state.password, passwordRegexCollection, true)
            switch(true){
                case state.formPage === ("1"|1):
                    return {formPage: parseInt(state.formPage) + 1}
                case state.formPage === ("2"|2) : 
                    return page2Input ? {formPage: "final"}:{error: true}
                default:
                    break;
            }
        });
    }

    moveToPreviousPage(){
        this.setState((state) => {
            switch(true){
                case state.formPage === "final":
                    return {formPage: 2}
                default:
                    return {formPage: parseInt(state.formPage)-1}
            }
        });
    }

    clearInputValues(e){
        //clears previous input when user clicks on input
        let inputId = e.target.closest("input").dataset.state
        this.setState({[inputId]:""})
    }

    //handles form naviagation
    handleClick(e) {
        let targetBtnClasses = e.target.closest("button").classList;
        
        if(targetBtnClasses.contains("continue")) {
            this.moveToNextPage()
        }
        if(targetBtnClasses.contains("goBack")) {
            this.moveToPreviousPage()
        }
        //resets form and changes it form type
        if(targetBtnClasses.contains("student")||targetBtnClasses.contains("teacher")){
            this.clearState(initialState)
            return this.setState({
                accountType: targetBtnClasses.contains("student")? "student":"teacher",
            });
        }
    }

    //handles all controlled inputs in form
    handleChange(e){
        //for verifying email code
        if(numberRegex.test(e)){
            this.setState({twoFactorLogin: e})
        }
        
        //for text or checkbox inputs
        if(e.target === undefined || e.target === false) return
        let input = e.target.closest("input")
        let inputId =  input.dataset.state
        //check for checkbox inputs
        if(input.type==="checkbox"){
            this.setState((state) => {
                return {[inputId]: state[inputId] === false ? true : false}
            })
        } else {
            let value = e.target.value
            return this.setState({[inputId]: value})
        }
    }
    handleFocus(e){
        this.clearInputValues(e);
    }
    
    render() {
        const formType = <Buttons 
                accountType={this.state.accountType} 
                formType={true} 
                handleClick={this.handleClick} 
                handleKeyPressed={this.handleKeyPressed}
            />
        const navButtons = <Buttons 
                formPage={this.state.formPage} 
                handleClick={this.handleClick} 
                handleKeyPressed={this.handleKeyPressed}
            />
        const manualLoginBtn = <button 
                    onClick={this.handleClick} 
                    className="continue mt-2 email-btn d-flex justify-content-center" 
                    type="button"
                >
                <span className="email-text">Login with email</span>
            </button>
        return (<div className="formContainer">
                <form 
                    className={`${this.state.accountType==="student"? "studentSignUpForm":"teacherSignUpForm"}`} 
                    id="loginForm"
                >
                    {/*passing a form type property into Buttons will render student and teacher btns. 
                    If not, it will render nav buttons*/}
                    <h1 style={{textAlign: "center"}}>Login</h1>
                    <h6 style={{textAlign: "center"}}>
                        {`As A ${this.state.accountType==="student"?"Student":"Teacher"}`}
                    </h6>

                    {formType}
                    <CurrentLogInPage 
                        {...this.state} 
                        handleChange={this.handleChange} 
                        handleFocus={this.handleFocus}
                    />
                    {this.state.formPage===1? manualLoginBtn:navButtons}
                </form>
            </div>
        )
    }
}