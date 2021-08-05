import React, { Component } from 'react'

//Regex Expressions to validate Form Inputs
const emailRegex = /.+@.+[\.]{1}.+/;
const numberRegex =/[0-9]{4,}/;
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
    accountType: "student",
    formPage: "signup",
    email: "",
    password: "",
    verifiedPassword:"",
    existingAccount: "",
    rememberMe:"",
    exposureToUs: "",
    verifiedEmail: "",
    classCode: "",
    schoolCode: "",
    subscriptionType:"",
    school: "",
    error: false,
    payment: "",
    windowWidth: window.innerWidth,
}

export default class Form extends Component {
    mounted = false;
    constructor(props) {
        super(props);
        this.state = initialState
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
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
                const studentPage2Input = numberRegex.test(state.verifiedEmail)
                const teacherPage3Input = subscriptionTypeRegex.test(state.subscriptionType)
                switch(true){
                    case state.formPage === 1:
                        return page1Input ? {formPage: state.formPage + 1}:{error: true}
                    case state.formPage ===2 && state.accountType === "student": 
                        return studentPage2Input ? {formPage: "final"}:{error: true}
                    case state.formPage ===3 && state.accountType === "teacher":
                        return teacherPage3Input ? {formPage: "final"}:{error: true}
                    default:
                        return {formPage: state.formPage + 1}
                }
            });
        }

        if(targetBtnClasses.contains("goBack")) {
            this.setState((state) => {
                let lastPage = (state.accountType === "student" && state.formPage === "final") || (state.accountType ==="teacher" && (state.formPage ==="final" || state.formPage==="enterprise"))
                return {formPage: lastPage != true ? state.formPage-1 : state.accountType ==="student" ? 2 : 3}
            });
        }
        //type of form being filled out
        if(targetBtnClasses.contains("student")||targetBtnClasses.contains("teacher")){
            clearState()
            return this.setState({
                accountType: targetBtnClasses.contains("student")? "student":"teacher",
                subscriptionType: targetBtnClasses.contains("teacher") ? "mid-tier":""
            });
        }
    }

    //handles all controlled inputs in form
    handleChange(e){
        let inputId = e.target.closest("input").dataset.state
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
        this.mounted = true
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
                <form id="signUpForm">
                        {/*passing a form type property into Buttons will render student and teacher btns. 
                        If not, it will render nav buttons*/}
                        <h1 style={{textAlign: "center"}}>Join Us</h1>
                        <Buttons formType={true} handleClick={this.handleClick} handleKeyPressed={this.handleKeyPressed}/>
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
                <div className="formNavBtns d-flex align-items-stretch justify-content-end"> 
                    <button 
                        type="button" 
                        className="btn continue" 
                        onClick={this.props.handleClick}>Continue
                    </button>
                </div>
            ) 
        } else {
            return (
                <div className={`formNavBtns d-flex align-items-stretch justify-content-between ${formType ? "mt-3": ""}`}> 
                    <button 
                        type="button" 
                        className= {`btn ${formType ? "student":"goBack"}`} 
                        onClick={this.props.handleClick}>{`${formType ? "Student": "Back"}`}
                    </button>
                    <button 
                        type="button" 
                        className={`btn ${formType ? "teacher": lastPage ? "submit":"continue"}`}
                        onClick={this.props.handleClick}>{`${formType ? "Teacher": lastPage ? "Submit":"Continue"}`}
                    </button>
                </div>
            )   
        }
    }
}

class FormPage extends Component {
    render() {
    //stored form pages
        const signUpOptions = <div style={{fontSize: this.props.windowWidth>575?"100%" : "75%"}} id="signUpOptions" class="d-flex-column mt-4 mb-4 align-items-center">
            <button id="google-btn" class="d-flex justify-content-center mb-2">
                <span class="google-icon"></span>
                <span class="google-text">Sign up with Google</span>
            </button>
            <button id="email-btn" class="email-btn d-flex justify-content-center" type="button">
                <span class="email-text">Sign up with email</span>
            </button>
        </div>
        const page1 = <div>
            <div className="mt-3">
                <label for="email" className="form-label">Email Address</label>
                <input 
                    value ={this.props.email}
                    data-state="email"
                    onChange={this.props.handleChange}
                    type="email" 
                    className="form-control" 
                    id="email" 
                    aria-describedby="emailHelp"/>
            </div>
            <div className={`align-items-end ${this.props.windowWidth>768? "d-flex":""}`}>
                <div className={`mb-3 mt-3 flex-fill ${this.props.windowWidth>768? "me-1":""}`}>
                    <label for="password" className="form-label">Password</label>
                    <input
                        value ={this.props.password}
                        onFocus={this.props.handleFocus}
                        data-state="password"
                        onChange={this.props.handleChange} 
                        type="password" 
                        className="form-control" 
                        id="password"/>
                </div>
                <div className={`mb-3 flex-fill ${this.props.windowWidth>768? "ms-1 mt-3":""}`}>
                    <label for="verifiedPassword" className="form-label">Re-enter Password</label>
                    <input
                        value ={this.props.verifiedPassword}
                        onFocus={this.props.handleFocus}
                        data-state="verifiedPassword"
                        onChange={this.props.handleChange} 
                        type="password" 
                        className="form-control" 
                        id="verifiedPassword"/>
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

        const studentPage2 = <div>
            <div className="mb-3 mt-3">
                <label for="verifiedEmail" className="form-label">Verify Email</label>
                <input
                    value={this.props.verifiedEmail}
                    onFocus={this.props.handleFocus}
                    data-state="verifiedEmail"
                    onChange={this.props.handleChange} 
                    type="number" 
                    className="form-control" 
                    id="verifiedEmail" 
                    aria-describedby="verifiedEmail"/>
                <div className="mt-2"id="verifyLabel">Input 4-digit code sent to {this.props.email} </div>
            </div>
        </div>;

        const studentPage3 = <div>
            <div className="mb-3 mt-3">
                <label for="classCode" className="form-label">Enter Class Code</label>
                <input 
                    value={this.props.classCode}
                    onFocus={this.props.handleFocus}
                    data-state="classCode"
                    onChange={this.props.handleChange}
                    type="number" 
                    className="form-control" 
                    id="classCode" 
                    aria-describedby="classCode"/>
            </div>
        </div>;

        const teacherPage2 = <div>
            <div className="mt-3 mb-3">
                <label for="School" className="form-label">School</label>
                <input
                    value={this.props.school}
                    data-state="school"
                    onChange={this.props.handleChange} 
                    type="school" 
                    className="form-control" 
                    id="school" 
                    aria-describedby="school"/>
            </div>
            <div className="mb-3">
                <label for="exposureToUs" className="form-label">How did you hear about us?</label>
                <input 
                    value={this.props.exposureToUs}
                    data-state="exposureToUs"
                    onChange={this.props.handleChange}
                    type="text" 
                    className="form-control" 
                    id="exposureToUs"/>
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
            },
        };
    //returns appropiate form page
    return formType[this.props.accountType][this.props.formPage]
    }
}
