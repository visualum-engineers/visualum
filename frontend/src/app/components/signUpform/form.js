/* 
Notes on whats missing:
    //Backend
        1. Verifying email code on server side
        2. Verifying class code on server side
        3. Google Sign up server authentication 
    //Frontend 
        4. Specific password user feedback requirements
        5. Error message when button is clicked and user (Logic is already built though) 
                - hasnt filled anything out, 
                - has invalid information 
        (Optional) 
                - star twinkling animation on background on signup form. 
                - Can be built with css 

    //Build once, business model and os agreement are complete
    6. Payment information and subscription type details
*/

import React, { Component } from 'react';
import InputCode from "./inputCode";

//Regex Expressions to validate Form Inputs
const emailRegex = /.+@.+[\.]{1}.+/;
const numberRegex =/[0-9]{6,}/;
const subscriptionTypeRegex = /[free]|[mid-tier]|[high-tier]|[enterprise]/
//piece-wise regex expression for password
const passwordLength = /.{8,20}/
const passwordUpperCase = /^(?=.*[A-Z]).*$/
const passwordLowerCase = /^(?=.*[a-z]).*$/
const passwordNumbers = /^(?=.*[0-9]).*$/
const passwordSymbols = /^(?=.*[!@#$%^&*]).*$/
const passwordRegexCollection = [passwordLength, passwordUpperCase, passwordLowerCase, passwordNumbers, passwordSymbols]

function passwordCheck(statePW, stateVerify, passwordRegexCollection, btnCheck=false){
    let passwordCheckArr = [...passwordRegexCollection]
    let testSpecificPwRegex = []
    if(btnCheck) return passwordCheckArr.every(regex => regex.test(statePW)) && stateVerify === statePW

    for (let i in passwordCheckArr){
        testSpecificPwRegex.push(passwordCheckArr[i].test(statePW))
    }
    return testSpecificPwRegex
}

const initialState = {
    accountType:"student",
    formPage: 1,
    email:"",
    password:"",
    verifiedPassword:"",
    existingAccount: "",
    rememberMe:"",
    exposureToUs: "",
    verifiedEmailCode: "",
    classCode: "",
    schoolCode: "",
    subscriptionType:"",
    school: "",
    error: false,
    payment: "",
    googleSignUp: "",
    windowWidth: window.innerWidth,
}

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.mounted = true;
    }
    //handles form naviagation
    handleClick(e) {
        let targetBtnClasses = e.target.closest("button").classList;
        const clearState = () => {
            this.setState(initialState);
        };
        
        //form page navigation behavior
        if(targetBtnClasses.contains("continue")) {
            this.setState((state) => {
                const page1Input = emailRegex.test(state.email) && passwordCheck(state.password, state.verifiedPassword, passwordRegexCollection, true)
                const studentPage2Input = numberRegex.test(state.verifiedEmailCode)
                const teacherPage3Input = subscriptionTypeRegex.test(state.subscriptionType)
                switch(true){
                    case state.formPage === ("1"|1):
                        return page1Input ? {formPage: parseInt(state.formPage) + 1}:{error: true}
                    case state.formPage === ("2"|2) && state.accountType === "student": 
                        return studentPage2Input ? {formPage: "final"}:{error: true}
                    case state.formPage === ("3"|3) && state.accountType === "teacher":
                        return teacherPage3Input ? {formPage: "final"}:{error: true}
                    default:
                        return {formPage: parseInt(state.formPage) + 1}
                }
            });
        }

        if(targetBtnClasses.contains("goBack")) {
            this.setState((state) => {
                let lastPage = (state.accountType === "student" && state.formPage === "final") || (state.accountType ==="teacher" && (state.formPage ==="final" || state.formPage==="enterprise"))
                return {formPage: lastPage != true ? parseInt(state.formPage)-1 : state.accountType ==="student" ? 2 : 3}
            });
        }
        //type of form being filled out
        if(targetBtnClasses.contains("student")||targetBtnClasses.contains("teacher")){
            clearState()
            return this.setState({
                accountType: targetBtnClasses.contains("student")? "student":"teacher",
                subscriptionType: targetBtnClasses.contains("teacher") ? "mid-tier":"",
                windowWidth: window.innerWidth,
            });
        }
    }

    //handles all controlled inputs in form
    handleChange(e){
        //for verifying email code
        if(numberRegex.test(e)){
            this.setState({verifiedEmailCode: e})
        }

        //for text or select inputs
        if(e.target === undefined || e.target === false) return
        let input = e.target.closest("input")
        let select = e.target.closest("select")
        let verifySelect = input === undefined || input === null
        let inputId =  verifySelect ? select.dataset.state : input.dataset.state
        let value = e.target.value
        this.setState({[inputId]: value})
    }

    handleFocus(e){
        let inputId = e.target.closest("input").dataset.state
        this.setState({[inputId]:""})
    }
    //Handles reshaping form components to be responsive
    handleResize=(e)=>{
        this.setState({windowWidth: window.innerWidth});
    }

    componentDidMount() {
        if(this.mounted){
            window.addEventListener("resize", this.handleResize);
        }
    }

    componentWillUnmount() {
        this.mounted = false
        window.addEventListener("resize", this.handleResize);
    } 

    render() {
        return (
            <div id="formContainer">
                <form className={`${this.state.accountType==="student"? "studentSignUpForm":"teacherSignUpForm"}`} id="signUpForm">
                        {/*passing a form type property into Buttons will render student and teacher btns. 
                        If not, it will render nav buttons*/}
                        <h1 style={{textAlign: "center"}}>Join Us</h1>
                        <h6 style={{textAlign: "center"}}>{`As A ${this.state.accountType==="student"?"Student":"Teacher"}`}</h6>
                        <Buttons accountType={this.state.accountType} formType={true} handleClick={this.handleClick} handleKeyPressed={this.handleKeyPressed}/>
                        <FormPage {...this.state} handleChange={this.handleChange} handleFocus={this.handleFocus}/>
                        <Buttons formPage={this.state.formPage} handleClick={this.handleClick} handleKeyPressed={this.handleKeyPressed}/>
                </form>
            </div>
        )
    }
}

//contains all Form Buttons
class Buttons extends Component{
    render(){
        //make sure the form is not on first page or final page
        const lastPage = this.props.formPage == "final"
        const formType = this.props.formType
        if(this.props.formPage<=1){
            return(
                <div className="formNavBtns d-flex justify-content-end"> 
                    <button 
                        type="button" 
                        className="btn continue" 
                        onClick={this.props.handleClick}>Continue
                    </button>
                </div>
            ) 
        } else {
            return (
                <div className={`d-flex ${formType ? "mt-3 formTypeBtns justify-content-center": "formNavBtns justify-content-between"}`}> 
                    <button 
                        type="button" 
                        className= {`btn ${formType ? this.props.accountType === "student" ? "active student":"student":"goBack"}`} 
                        onClick={this.props.handleClick}>{`${formType ? "Student": "Back"}`}
                    </button>
                    <button 
                        type="button" 
                        className={`btn ${formType ? this.props.accountType ==="teacher" ? "active teacher":"teacher": lastPage ? "submit":"continue"}`}
                        onClick={this.props.handleClick}>{`${formType ? "Teacher": lastPage ? "Submit":"Continue"}`}
                    </button>
                </div>
            )   
        }
    }
}
//for verification of code, prevents update of state.
//make replace with react hooks 
//for a cleaner verison in future
let loading = false 
class FormPage extends Component {
    render() {
    //stored form pages
        const signUpOptions = <div id="signUpOptions" className="d-flex-column mt-5 mb-5 ">
            <button id="google-btn" className="mb-2">
                <div id="g_id_onload"
                    data-client_id="297543839155-cclc3bsf6m26pfaj1bmrfb1l4bgpcin7.apps.googleusercontent.com"
                    data-context="signup"
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
            <button id="email-btn" className="email-btn d-flex justify-content-center" type="button">
                <span className="email-text">Sign up with email</span>
            </button>
        </div>
        
        const page1 = <div>
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
                <label for="email" className="form-label">Email Address</label>
                    
            </div>
            <div className={`align-items-end ${this.props.windowWidth>768? "d-flex":""}`}>
                <div className={`mb-3 mt-3 flex-fill form-floating ${this.props.windowWidth>768? "me-1":""}`}>
                    <input
                        placeholder="Password"
                        value ={this.props.password}
                        onFocus={this.props.handleFocus}
                        data-state="password"
                        onChange={this.props.handleChange} 
                        type="password" 
                        className="form-control" 
                        id="password"/>
                    <label style={{color:"black"}}for="password" className="form-label">Password</label>
                </div>
                <div className={`mb-3 flex-fill form-floating ${this.props.windowWidth>768? "ms-1 mt-3":""}`}>
                    <input
                        placeholder ="Re-enter Password"
                        value ={this.props.verifiedPassword}
                        onFocus={this.props.handleFocus}
                        data-state="verifiedPassword"
                        onChange={this.props.handleChange} 
                        type="password" 
                        className="form-control" 
                        id="verifiedPassword"/>
                    <label for="verifiedPassword" className="form-label">Re-enter Password</label>
                </div>
            </div>
            <div className="mb-3 form-check">
                <input
                    value ={this.props.rememberMe}
                    data-state="rememberMe"
                    onChange={this.props.handleChange} 
                    type="checkbox" 
                    className="form-check-input" 
                    id="rememberMe"/>
                <label className="form-check-label" for="rememberMe">Remember Me</label>
            </div>
        </div>;
        
        const studentPage2 =  <InputCode length={6}
                label="Verify Email"
                description = {`Input 6-digit code sent to: ${this.props.email}`}
                onComplete={code => {
                if(loading != true){
                    loading = true
                    this.props.handleChange(code)
                    }
                    //implent a way to also disable inputs... for future after 10 seconds
                    setTimeout(() => loading = false, 10000)
                }}
            />
            
        //useful code if above doesnt work
        /*<div>
            <div className="mt-4">
            <label for="verifiedEmailCode" className="form-label">Verify Email</label>
                <input
                    placeholder="Verify Email"
                    value={this.props.verifiedEmailCode}
                    onFocus={this.props.handleFocus}
                    data-state="verifiedEmailCode"
                    onChange={this.props.handleChange} 
                    type="number" 
                    className="form-control" 
                    id="verifiedEmailCode" 
                    aria-describedby="verifiedEmailCode"/>
            </div>
            <div className="mt-2 mb-4"id="verifyLabel">Input 4-digit code sent to {this.props.email} </div>
        </div>; */
        const studentPage3 = <div>
            <div className="form-floating mb-3 mt-3">
                <input 
                    placeholder="Enter Class Code"
                    value={this.props.classCode}
                    onFocus={this.props.handleFocus}
                    data-state="classCode"
                    onChange={this.props.handleChange}
                    type="text" 
                    className="form-control" 
                    id="classCode" 
                    aria-describedby="classCode"/>
                <label for="classCode" className="form-label">Enter Class Code</label>
            </div>
        </div>;

        const teacherPage2 = <div>
            <div className="form-floating mt-3 mb-3">
                <input
                    placeholder="School or Insitution"
                    value={this.props.school}
                    data-state="school"
                    onChange={this.props.handleChange} 
                    type="text" 
                    className="form-control" 
                    id="school" 
                    aria-describedby="school"/>
                <label for="School" className="form-label">School or Insitution</label>
            </div>
            <div className="mb-3">
                <label for="exposureToUs" className="form-label">How did you hear about us?</label>
                <select 
                    onChange={this.props.handleChange} 
                    value={this.props.exposureToUs} 
                    className="form-select" 
                    size="1" 
                    id="floatingSelect" 
                    aria-label="select one"
                    data-state="exposureToUs"
                    >
                    <option value="">Choose One</option>
                    <option value="social media">Social Media</option>
                    <option value="management">Management</option>
                    <option value="co-worker">Co-worker</option>
                    <option value="students">Students</option>
                    <option value="friends or relative">Friend or Relative</option>
                    <option value="other">Other</option>
                </select>
                {/*<input 
                    placeholder = "How did you hear about us?"
                    value={this.props.exposureToUs}
                    data-state="exposureToUs"
                    onChange={this.props.handleChange}
                    type="text" 
                    className="form-control" 
                    id="exposureToUs"/>
                */}
            </div>
        </div>;

        const teacherPage3 = <div>
            <div className="mb-3 mt-3 d-flex-column" style={{textAlign:"center"}}>
                <label for="subscriptionType" className="form-label">Choose Subscription</label>
                <div>
                    <input
                        checked={this.props.subscriptionType === "free"}
                        name ="subscriptionType"
                        value ="free"
                        data-state="subscriptionType"
                        onChange={this.props.handleChange} 
                        type="radio" 
                        id="free" 
                        aria-describedby="subscriptionType"/>
                    <input
                        checked={this.props.subscriptionType === "mid-tier"}
                        name ="subscriptionType"
                        value ="mid-tier"
                        data-state="subscriptionType"
                        onChange={this.props.handleChange} 
                        type="radio"  
                        id="mid-tier" 
                        aria-describedby="subscriptionType"/>
                    <input
                        checked={this.props.subscriptionType === "high-tier"}
                        name ="subscriptionType"
                        value ="high-tier"
                        data-state="subscriptionType"
                        onChange={this.props.handleChange} 
                        type="radio"  
                        id="high-tier" 
                        aria-describedby="subscriptionType"/>
                    <input
                        checked={this.props.subscriptionType === "enterprise"}
                        name ="subscriptionType"
                        value = "enterprise"
                        data-state="subscriptionType"
                        onChange={this.props.handleChange} 
                        type="radio"  
                        id="enterprise" 
                        aria-describedby="subscriptionType"/>
                </div>
            </div>
        </div>;

        const teacherPage4 = <div>
            <div className="mb-3">
                <label for="payment" className="form-label">Payment</label>
                <input
                    data-state="payment"
                    value={this.props.payment}
                    onChange={this.props.handleChange} 
                    type="number"  
                    id="payment" 
                    aria-describedby="payment"/>
            </div>
        </div>;

    //form page when school has bought license for teacher
        const enterprise =  <div>
        <div className="mb-3">
            <label for="schoolCode" className="form-label">School Code</label>
            <input 
                data-state="schoolCode"
                onChange={this.props.handleChange}
                type="number" 
                id="schoolCode" 
                aria-describedby="schoolCodeHelp"/>
            </div>
        </div>;

    //organizes pages to be easily searched through
        const formType = {
            "student":{
                1: page1,
                2: studentPage2,
                final: studentPage3,
                signup: signUpOptions,
            },
            "teacher": {
                1: page1,
                2: teacherPage2,
                3: teacherPage3,
                enterprise: enterprise,
                final: teacherPage4,
                signup: signUpOptions,
            },
        };
    //returns appropiate form page
    return formType[this.props.accountType][this.props.formPage]
    }
}