import React, { Component } from 'react';
import Buttons from './buttons';
const emailRegex = /.+@.+[\.]{1}.+/;
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
    userName:"",
    password:"",
    rememberMe:"",
    googleSignIn: "",
    twoFactorLogin: "",
    windowWidth: window.innerWidth,
    error: false,
}

class EmailSignIn extends Component {
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
                <label for="email" className="form-label">Email Address</label>
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
                <label for="password" className="form-label">Password</label>
            </div>
        </div>
        )
    }
}

class TwoFactorLogin extends Component {
    render() {
        return (<div>

        </div>
        )
    }
}

class GoogleLogin extends Component {
    render() {
        return (<div>

        </div>
        )
    }
}

class CurrentLogInPage extends Component {
    render() {
        //organizes pages to be easily searched through
            const formPage= {
                    1: <GoogleLogin {...this.props}/>,
                    2: <TwoFactorLogin {...this.props}/>
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

    moveToNextPage(){
        this.setState((state) => {
            const page1Input = emailRegex.test(state.email) && passwordCheck(state.password, passwordRegexCollection, true)
            const page2Input = numberRegex.test(state.twoFactorLogin)
            switch(true){
                case state.formPage === ("1"|1):
                    return page1Input ? {formPage: parseInt(state.formPage) + 1}:{error: true}
                case state.formPage === ("2"|2) : 
                    return page2Input ? {formPage: "final"}:{error: true}
            }
        });
    }

    //handles form naviagation
    handleClick(e) {
        let targetBtnClasses = e.target.closest("button").classList;
        //form page navigation behavior
        if(targetBtnClasses.contains("continue")) {
            this.moveToNextPage()
        }

        if(targetBtnClasses.contains("goBack")) {
            this.setState((state) => {
                return {formPage: parseInt(state.formPage)-1}
            });
        }
        //type of form being filled out
        if(targetBtnClasses.contains("student")||targetBtnClasses.contains("teacher")){
            this.clearState(initialState)
            return this.setState({
                accountType: targetBtnClasses.contains("student")? "student":"teacher",
                windowWidth: window.innerWidth,
            });
        }
    }

    //handles all controlled inputs in form
    handleChange(e){
        //for verifying email code
        if(numberRegex.test(e)){
            this.setState({twoFactorLogin: e})
        }
        //for text or select inputs
        if(e.target === undefined || e.target === false) return
        let input = e.target.closest("input")
        let inputId =  input.dataset.state
        let value = e.target.value
        this.setState({[inputId]: value})
    }

    handleFocus(e){
        //clears previous input when user clicks on input
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
            <div className="formContainer">
                <form className={`d-flex ${this.state.accountType==="student"? "studentSignUpForm":"teacherSignUpForm"}`} id="loginForm">
                        {/*passing a form type property into Buttons will render student and teacher btns. 
                        If not, it will render nav buttons*/}
                        <h1 style={{textAlign: "center"}}>Login</h1>
                        <h6 style={{textAlign: "center"}}>{`As A ${this.state.accountType==="student"?"Student":"Teacher"}`}</h6>
                        <Buttons accountType={this.state.accountType} formType={true} handleClick={this.handleClick} handleKeyPressed={this.handleKeyPressed}/>
                        <CurrentLogInPage {...this.state} handleChange={this.handleChange} handleFocus={this.handleFocus}/>
                        <Buttons formPage={this.state.formPage} handleClick={this.handleClick} handleKeyPressed={this.handleKeyPressed}/>
                </form>
            </div>
        )
    }
}