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
import Buttons from './buttons';

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
//for verification of code, prevents update of state.
//may replace with react hooks 
//for a cleaner verison in future
let loading = false 

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
    googleSignUp: "",
    email:"",
    password:"",
    verifiedPassword:"",
    existingAccount: "",
    exposureToUs: "",
    verifiedEmailCode: "",
    classCode: "",
    schoolCode: "",
    subscriptionType:"",
    school: "",
    payment: "",
    rememberMe:false,
    error: false,
    windowWidth: window.innerWidth,
}
//stored form pages
class SignUpOptions extends Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        document.body.appendChild(script);
    }
    render(){
        return (
            <div id="signUpOptions" className="d-flex-column mt-4 ">
            <button className="google-btn mb-2">
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
        </div>
    )}
}

//email and password 
class ManualSignUp extends Component {
    render(){
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
                    <label style={{color:"black"}}htmlFor="password" className="form-label">Password</label>
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
                    <label htmlFor="verifiedPassword" className="form-label">Re-enter Password</label>
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
                <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
            </div>
        </div>
    )}
}

//has email verification code
class StudentVerifyEmail extends Component{
    render(){
        return(
            <InputCode length={6}
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
        )}
}
//class verification code
class StudentClassCode extends Component {
    render(){
        return (
            <div>
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
                    <label htmlFor="classCode" className="form-label">Enter Class Code</label>
                </div>
            </div>
        )}
}
//exposure to us and what school 
class TeacherExposureToUs extends Component{
    render(){
        return (
        <div>
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
                <label htmlFor="School" className="form-label">School or Insitution</label>
            </div>
            <div className="mb-3">
                <label htmlFor="exposureToUs" className="form-label">How did you hear about us?</label>
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
                    <option value="school-management">School Management</option>
                    <option value="co-worker">Co-worker</option>
                    <option value="students">Students</option>
                    <option value="friends or relative">Friend or Relative</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
        )
    }
}

//subscription
class SubscriptionType extends Component{
    render(){
        return (
        <div>
                <div className="mb-3 mt-3 d-flex-column" style={{textAlign:"center"}}>
                    <label htmlFor="subscriptionType" className="form-label">Choose Subscription</label>
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
            </div>
        )
    }
}
//payment page
class PaymentPage extends Component{
    render(){
        return(
            <div>
                <div className="mb-3">
                    <label htmlFor="payment" className="form-label">Payment</label>
                    <input
                        data-state="payment"
                        value={this.props.payment}
                        onChange={this.props.handleChange} 
                        type="number"  
                        id="payment" 
                        aria-describedby="payment"/>
                </div>
            </div>
        )
    }
}

//form page when school has bought license for teacher
class Enterprise extends Component {
    render(){
        return(
            <div>
                <div className="mb-3">
                    <label htmlFor="schoolCode" className="form-label">School Code</label>
                    <input 
                        data-state="schoolCode"
                        onChange={this.props.handleChange}
                        type="number" 
                        id="schoolCode" 
                        aria-describedby="schoolCodeHelp"/>
                </div>
            </div>
        )   
    }
}

class CurrentSignUpFormPage extends Component {
    render() {
    //organizes pages to be easily searched through
        const formType = {
            "student":{
                1: <SignUpOptions {...this.props}/>,
                2: <ManualSignUp {...this.props}/>,
                3: <StudentVerifyEmail {...this.props}/>,
                final: <StudentClassCode {...this.props}/>,
            },
            "teacher": {
                1: <SignUpOptions {...this.props}/>,
                2: <ManualSignUp {...this.props}/>,
                3: <TeacherExposureToUs {...this.props}/>,
                4: <SubscriptionType {...this.props}/>,
                enterprise: <Enterprise {...this.props}/>,
                final: <PaymentPage {...this.props}/>,
            },
        };
    //returns appropiate form page
    return formType[this.props.accountType][this.props.formPage]
    }
}

export default class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.mounted = true;
    }
    //form page navigation behavior
    moveToNextPage(){
        this.setState((state) => {
            const manualSignUp = emailRegex.test(state.email) && passwordCheck(state.password, state.verifiedPassword, passwordRegexCollection, true)
            const verifyEmail = numberRegex.test(state.verifiedEmailCode)
            const subscriptionType = subscriptionTypeRegex.test(state.subscriptionType)
            switch(true){
                case state.formPage === ("2"|2):
                    return manualSignUp ? {formPage: parseInt(state.formPage) + 1}:{error: true}
                case state.formPage === ("3"|3) && state.accountType === "student": 
                    return verifyEmail ? {formPage: "final"}:{error: true}
                case state.formPage === ("4"|4) && state.accountType === "teacher":
                    return subscriptionType ? {formPage: "final"}:{error: true}
                default:
                    return {formPage: parseInt(state.formPage) + 1}
            }
        });
    }

    moveToPreviousPage(){
        this.setState((state) => {
            let lastPage = (state.accountType === "student" && state.formPage === "final") || (state.accountType ==="teacher" && (state.formPage ==="final" || state.formPage==="enterprise"))
            return {formPage: lastPage != true ? parseInt(state.formPage)-1 : state.accountType ==="student" ? 2 : 3}
        });
    }

    clearInputValues(e){
        let inputId = e.target.closest("input").dataset.state
        this.setState({[inputId]:""})
    }
    //handles form naviagation
    handleClick(e) {
        let targetBtnClasses = e.target.closest("button").classList;
        const clearState = () => {
            this.setState(initialState);
        };
        
        if(targetBtnClasses.contains("continue")) {
            this.moveToNextPage();
        }

        if(targetBtnClasses.contains("goBack")) {
           this.moveToPreviousPage();
        }

        //resets form and changes form type
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
        //for text, checkbox or select inputs
        if(e.target === undefined || e.target === false) return
        let input = e.target.closest("input")
        let select = e.target.closest("select")
        //checks for input or select element
        let verifySelect = input === undefined || input === null
        let inputId =  verifySelect ? select.dataset.state : input.dataset.state
        //check for checkbox inputs
        if(input.type==="checkbox"){
            this.setState((state) => {
                return {[inputId]: state[inputId] === false ? true : false}
            })
        } else {
            let value = e.target.value;
            this.setState({[inputId]: value})
        }
    }

    handleFocus(e){
        this.clearInputValues(e)
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
                    <span className="email-text">Sign up with email</span>
                </button>
        
        return (
            <div className="formContainer">
                <form className={`${this.state.accountType==="student"? "studentSignUpForm":"teacherSignUpForm"}`} id="signUpForm">
                        {/*passing a form type property into Buttons will render student and teacher btns. 
                        If not, it will render nav buttons*/}
                        <h1 style={{textAlign: "center"}}>Join Us</h1>
                        <h6 style={{textAlign: "center"}}>
                            {`As A ${this.state.accountType==="student"?"Student":"Teacher"}`}
                        </h6>
                        {formType}
                        <CurrentSignUpFormPage 
                            {...this.state} 
                            handleChange={this.handleChange} 
                            handleFocus={this.handleFocus}/>
                        {this.state.formPage===1? manualLoginBtn : navButtons}
                </form>
            </div>
        )
    }
}
//useful code if email verification
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