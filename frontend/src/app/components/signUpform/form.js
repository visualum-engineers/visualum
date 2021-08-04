import React, { Component } from 'react'
const initialState = {
    accountType: "student",
    formPage: 1,
    email: "",
    password: "",
    existingAccount: "",
    rememberMe:"",
    exposureToUs: "",
    verifiedEmail: "",
    classCode: "",
    schoolCode: "",
    subscriptionType:"",
}

class FormPage extends Component {
    render() {
        const page1 = <div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input 
                        onChange={this.props.handleChange}
                        type="email" 
                        className="form-control" 
                        id="email" 
                        aria-describedby="emailHelp"/>
                    <div id="emailHelp">We'll never share your email with anyone else</div>
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Password</label>
                    <input
                        onChange={this.props.handleChange} 
                        type="password" 
                        className="form-control" 
                        id="password"/>
                </div>
                <div className="mb-3 form-check">
                    <input
                        onChange={this.props.handleChange} 
                        type="checkbox" 
                        className="form-check-input" 
                        id="rememberMe"/>
                    <label className="form-check-label" for="rememberMe">Remember Me</label>
                </div>
            </div>;

        const studentPage2 = <div>
                <div className="mb-3">
                    <label for="verifiedEmail" className="form-label">Verify Email</label>
                    <input
                        onChange={this.props.handleChange} 
                        type="number" 
                        className="form-control" 
                        id="verifiedEmail" 
                        aria-describedby="verifiedEmail"/>
                    <div id="verifyLabel">Input 4-digit code sent to {this.props.email} </div>
                </div>
            </div>;

        const studentPage3 = <div>
                <div className="mb-3">
                    <label for="classCode" className="form-label">Enter Class Code</label>
                    <input 
                        onChange={this.props.handleChange}
                        type="number" 
                        className="form-control" 
                        id="classCode" 
                        aria-describedby="classCode"/>
                </div>
            </div>;

        const teacherPage2 = <div>
                <div className="mb-3">
                    <label for="School" className="form-label">School</label>
                    <input
                        onChange={this.props.handleChange} 
                        type="School" 
                        className="form-control" 
                        id="School" 
                        aria-describedby="School"/>
                </div>
                <div className="mb-3">
                    <label for="exposureToUs" className="form-label">How did you hear about us?</label>
                    <input type="text" className="form-control" id="exposureToUs"/>
                </div>
            </div>;

        const teacherPage3 = <div>
                <div className="mb-3">
                    <label for="subscriptionType" className="form-label">Choose Subscription</label>
                    <input
                        onChange={this.props.handleChange} 
                        type="type" 
                        className="form-control" 
                        id="subscriptionType" 
                        aria-describedby="emailHelp"/>
                </div>
            </div>;
    
        const teacherPage4 = <div>
                <div className="mb-3">
                    <label for="payment" className="form-label">Payment</label>
                    <input
                        onChange={this.props.handleChange} 
                        type="number" 
                        className="form-control" 
                        id="payment" 
                        aria-describedby="payment"/>
                </div>
            </div>;
        
        //form page when school has bought license for teacher
        const enterprise =  <div>
                <div className="mb-3">
                    <label for="schoolCode" className="form-label">School Code</label>
                    <input 
                        onChange={this.props.handleChange}
                        type="number" 
                        className="form-control" 
                        id="schoolCode" 
                        aria-describedby="schoolCodeHelp"/>
                </div>
            </div>;

        //stores form pages to be easily searched through
        const formType = {
            "student":{
                1: page1,
                2: studentPage2,
                final: studentPage3,
            },
            "teacher": {
                1: page1,
                2: teacherPage2,
                3: teacherPage3,
                enterprise: enterprise,
                final: teacherPage4,
            },
        };

        return formType[this.props.accountType][this.props.formPage]
    }
}

class Buttons extends Component{
    render(){
        //make sure the form is not on first page or final page
        const lastPage = this.props.formPage == "final"
        const formType = this.props.formType
        if(this.props.formPage<=1){
            return(
                <div className="d-flex align-items-stretch justify-content-end"> 
                    <button 
                        type="button" 
                        className="btn continue" 
                        onClick={this.props.handleClick}>Continue
                    </button>
                </div>
            ) 
        } else {
            //passing a form type property will load student and teacher form btns. 
            //If not, it will be form nav buttons
            return (
                <div className="d-flex align-items-stretch justify-content-between"> 
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

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = initialState
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //handles button clicks
    handleClick(e) {
        let targetBtnClasses = e.target.closest("button").classList;
        const clearState = () => {
            this.setState({ ...initialState });
        };

        //form page navigation behavior
        if(targetBtnClasses.contains("continue")) {
            this.setState((state) => {
                let lastPage = (state.accountType === "student" && state.formPage >= 2) || (state.accountType ==="teacher" && state.formPage >= 3)
                return {formPage: lastPage ? "final" : state.formPage + 1}
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
            return this.setState((state) => ({
                accountType: targetBtnClasses.contains("student")? "student":"teacher",
            }));
        }
    }

    //handles all controlled inputs in form
    handleChange(e){
        let inputId = e.target.closest("input").id
        let key = e.target.value
        this.setState(()=>{
            return {[inputId]: key}
        })
    }

    render() {
        return (
            <div id="formContainer">
                <form id="signUpForm">
                        <h1 style={{textAlign: "center"}}>Join Our Community</h1>
                        <Buttons formType={true} handleClick={this.handleClick}/>
                        <FormPage {...this.state} handleChange={this.handleChange}/>
                        <Buttons formPage={this.state.formPage} handleClick={this.handleClick}/>
                </form>
            </div>
        )
    }
}
