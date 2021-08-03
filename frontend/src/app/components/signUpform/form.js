import React, { Component } from 'react'

class FormPage extends Component {
    render() {
        const page1 = <div>
                <div className="mb-3">
                    <label for="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"/>
                    <div id="emailHelp">We'll never share your email with anyone else</div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberPW"/>
                    <label className="form-check-label" for="rememberPW">Remember Me</label>
                </div>
            </div>;

        const studentPage2 = <div>
                <div className="mb-3">
                    <label for="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"/>
                    <div id="emailHelp">We'll never share your email with anyone else</div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberPW"/>
                    <label className="form-check-label" for="rememberPW">Remember Me</label>
                </div>
            </div>;

        const studentPage3 = <div>
                <div className="mb-3">
                    <label for="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"/>
                    <div id="emailHelp">We'll never share your email with anyone else</div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberPW"/>
                    <label className="form-check-label" for="rememberPW">Remember Me</label>
                </div>
            </div>;

        const teacherPage2 = <div>
                <div className="mb-3">
                    <label for="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"/>
                    <div id="emailHelp">We'll never share your email with anyone else</div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberPW"/>
                    <label className="form-check-label" for="rememberPW">Remember Me</label>
                </div>
            </div>;

        const teacherPage3 = <div>
                <div className="mb-3">
                    <label for="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"/>
                    <div id="emailHelp">We'll never share your email with anyone else</div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberPW"/>
                    <label className="form-check-label" for="rememberPW">Remember Me</label>
                </div>
            </div>;
    
        const teacherPage4 = <div>
                <div className="mb-3">
                    <label for="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"/>
                    <div id="emailHelp">We'll never share your email with anyone else</div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberPW"/>
                    <label className="form-check-label" for="rememberPW">Remember Me</label>
                </div>
            </div>;
        
        //form page when school has bought license for teacher
        const enterprise =  <div>
                <div className="mb-3">
                    <label for="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"/>
                    <div id="emailHelp">We'll never share your email with anyone else</div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberPW"/>
                    <label className="form-check-label" for="rememberPW">Remember Me</label>
                </div>
            </div>;
            
        //welcome animation page
        const finalPage = <div>
                <div className="mb-3">
                    <label for="Email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"/>
                    <div id="emailHelp">We'll never share your email with anyone else</div>
                </div>
                <div className="mb-3">
                    <label for="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberPW"/>
                    <label className="form-check-label" for="rememberPW">Remember Me</label>
                </div>
            </div>;

        //stores form pages to be easily searched through
        const formType = {
            student:{
                1: page1,
                2: studentPage2,
                3: studentPage3,
                4: finalPage,
            },
            teacher: {
                1: page1,
                2: teacherPage2,
                3: teacherPage3,
                4: teacherPage4,
                5: finalPage,
                "enterprise": enterprise,
            },
        };
        return formType[this.props.accountType][this.props.formPage]
    }
}

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountType: "student",
            formPage: 1,
            email: "",
            password: "",
            verifiedEmail: "",
            subscriptionType:"",
            schoolCode: "",
            rememberMe:"",
            exposureToUs: "",
            existingAccount: "",
            /* need to look this up to not cause a secruity risk
            Might require something like Stripe. 
            _paymentInfo: "",
            */
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e=0) {
        let targetBtnClasses = e.target.closest("button").classList;
        //form page navigation
        if(targetBtnClasses.contains("continue")) return this.setState((state) => ({
            formPage: state.formPage + 1,
          }));
        
        if(targetBtnClasses.contains("goBack")) return this.setState((state) => ({
            formPage: state.formPage - 1,
        }));
        //type of form being filled out
        if(targetBtnClasses.contains("student")) return this.setState(() => ({
                accountType: "student",
                formPage: 1,
              }));

        if(targetBtnClasses.contains("teacher")) return this.setState(() => ({
                accountType: "teacher",
                formPage: 1,
            }));
    }

    render() {
        return (
            <form id="signUpForm">
                <div className="d-flex align-items-stretch justify-content-center">
                    <button type="button" className="btn student" onClick={this.handleClick}>Student</button>
                    <button type="button" className="btn teacher" onClick={this.handleClick}>Teacher</button>
                </div>
                <FormPage formPage={this.state.formPage} accountType={this.state.accountType}/>
                <div className="d-flex align-items-stretch justify-content-center">
                    <button type="button" className="btn goBack" onClick={this.handleClick}>Back</button>
                    <button type="button" className="btn continue" onClick={this.handleClick}>Continue</button>
                </div>
            </form>
        )
    }
}
