import React, { Component } from 'react';
import Buttons from './buttons';

const initialState = {
    accountType:"student",
    formPage: 1,
    userName:"",
    password:"",
    rememberMe:"",
    googleSignIn: "",
    windowWidth: window.innerWidth,
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
                        <CurrentLogInPage {...this.state} handleChange={this.handleChange} handleFocus={this.handleFocus}/>
                        <Buttons formPage={this.state.formPage} handleClick={this.handleClick} handleKeyPressed={this.handleKeyPressed}/>
                </form>
            </div>
        )
    }
}