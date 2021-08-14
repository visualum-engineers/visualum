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
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

import Form from './Form'

//Regex Expressions to validate Form Inputs
const emailRegex = /.+@.+[\.]{1}.+/;
const numberRegex = /[0-9]{6,}/;
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
let loading = false;

function passwordCheck(statePW, stateVerify, passwordRegexCollection, btnCheck = false) {
    let passwordCheckArr = [...passwordRegexCollection]
    let testSpecificPwRegex = []
    if (btnCheck) {
        return passwordCheckArr.every(regex => regex.test(statePW)) && stateVerify === statePW
    }

    for (let i in passwordCheckArr) {
        testSpecificPwRegex.push(passwordCheckArr[i].test(statePW))
    }
    return testSpecificPwRegex
}

const initialState = {
    accountType: "student",
    formPage: 1,
    googleSignUp: "",
    email: "",
    password: "",
    verifiedPassword: "",
    existingAccount: "",
    exposureToUs: "",
    verifiedEmailCode: "",
    classCode: "",
    schoolCode: "",
    subscriptionType: "",
    school: "",
    payment: "",
    rememberMe: false,
    error: false,
    windowWidth: window.innerWidth,
}

export default function SignUpForm() {
    const [stage, setStage] = useState({ step: 1, type: "student" });
    let history = useHistory();

    return (
        <div className="form-page">
            <div className="form-container">
                <Form stage={stage} setStage={setStage} history={history} />
            </div>
        </div>
    )
}
// class CurrentSignUpFormPage extends Component {
//     render() {
//         //organizes pages to be easily searched through
//         const formType = {
//             "student": {
//                 1: <SignUpOptions {...this.props} />,
//                 2: <ManualSignUp {...this.props} />,
//                 3: <StudentVerifyEmail {...this.props} />,
//                 final: <StudentClassCode {...this.props} />,
//             },
//             "teacher": {
//                 1: <SignUpOptions {...this.props} />,
//                 2: <ManualSignUp {...this.props} />,
//                 3: <TeacherExposureToUs {...this.props} />,
//                 4: <SubscriptionType {...this.props} />,
//                 enterprise: <Enterprise {...this.props} />,
//                 final: <PaymentPage {...this.props} />,
//             },
//         };
//         //returns appropiate form page
//         return formType[this.props.accountType][this.props.formPage]
//     }
// }




// class SignUpFormOLD extends Component {
//     constructor(props) {
//         super(props);
//         this.state = initialState
//         this.handleClick = this.handleClick.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleFocus = this.handleFocus.bind(this);
//         this.mounted = true;
//     }
//     //form page navigation behavior
//     moveToNextPage() {
//         this.setState((state) => {
//             const manualSignUp = emailRegex.test(state.email) && passwordCheck(state.password, state.verifiedPassword, passwordRegexCollection, true)
//             const verifyEmail = numberRegex.test(state.verifiedEmailCode)
//             const subscriptionType = subscriptionTypeRegex.test(state.subscriptionType)
//             switch (true) {
//                 case state.formPage === ("2" | 2):
//                     return manualSignUp ? { formPage: parseInt(state.formPage) + 1 } : { error: true }
//                 case state.formPage === ("3" | 3) && state.accountType === "student":
//                     return verifyEmail ? { formPage: "final" } : { error: true }
//                 case state.formPage === ("4" | 4) && state.accountType === "teacher":
//                     return subscriptionType ? { formPage: "final" } : { error: true }
//                 default:
//                     return { formPage: parseInt(state.formPage) + 1 }
//             }
//         });
//     }

//     moveToPreviousPage() {
//         this.setState((state) => {
//             let lastPage = (state.accountType === "student" && state.formPage === "final") || (state.accountType === "teacher" && (state.formPage === "final" || state.formPage === "enterprise"))
//             return { formPage: lastPage != true ? parseInt(state.formPage) - 1 : state.accountType === "student" ? 2 : 3 }
//         });
//     }

//     clearInputValues(e) {
//         let inputId = e.target.closest("input").dataset.state
//         this.setState({ [inputId]: "" })
//     }
//     //handles form naviagation
//     handleClick(e) {
//         let targetBtnClasses = e.target.closest("button").classList;
//         const clearState = () => {
//             this.setState(initialState);
//         };

//         if (targetBtnClasses.contains("continue")) {
//             this.moveToNextPage();
//         }

//         if (targetBtnClasses.contains("goBack")) {
//             this.moveToPreviousPage();
//         }

//         //resets form and changes form type
//         if (targetBtnClasses.contains("student") || targetBtnClasses.contains("teacher")) {
//             clearState()
//             return this.setState({
//                 accountType: targetBtnClasses.contains("student") ? "student" : "teacher",
//                 subscriptionType: targetBtnClasses.contains("teacher") ? "mid-tier" : "",
//                 windowWidth: window.innerWidth,
//             });
//         }
//     }

//     //handles all controlled inputs in form
//     handleChange(e) {
//         //for verifying email code
//         if (numberRegex.test(e)) {
//             this.setState({ verifiedEmailCode: e })
//         }
//         //for text, checkbox or select inputs
//         if (e.target === undefined || e.target === false) return
//         let input = e.target.closest("input")
//         let select = e.target.closest("select")
//         //checks for input or select element
//         let verifySelect = input === undefined || input === null
//         let inputId = verifySelect ? select.dataset.state : input.dataset.state
//         //check for checkbox inputs
//         if (input.type === "checkbox") {
//             this.setState((state) => {
//                 return { [inputId]: state[inputId] === false ? true : false }
//             })
//         } else {
//             let value = e.target.value;
//             this.setState({ [inputId]: value })
//         }
//     }

//     handleFocus(e) {
//         this.clearInputValues(e)
//     }
//     //Handles reshaping form components to be responsive
//     handleResize = (e) => {
//         this.setState({ windowWidth: window.innerWidth });
//     }

//     componentDidMount() {
//         if (this.mounted) {
//             window.addEventListener("resize", this.handleResize);
//         }
//     }

//     componentWillUnmount() {
//         this.mounted = false
//         window.addEventListener("resize", this.handleResize);
//     }

//     render() {
//         const formType = <Buttons
//             accountType={this.state.accountType}
//             formType={true}
//             handleClick={this.handleClick}
//             handleKeyPressed={this.handleKeyPressed}
//         />
//         const navButtons = <Buttons
//             formPage={this.state.formPage}
//             handleClick={this.handleClick}
//             handleKeyPressed={this.handleKeyPressed}
//         />
//         const manualLoginBtn = <button
//             onClick={this.handleClick}
//             className="continue mt-2 email-btn d-flex justify-content-center"
//             type="button"
//         >
//             <span className="email-text">Sign up with email</span>
//         </button>

//         return (
//             <div className="formContainer">
//                 <form className={`${this.state.accountType === "student" ? "studentSignUpForm" : "teacherSignUpForm"}`} id="signUpForm">
//                     {/*passing a form type property into Buttons will render student and teacher btns. 
//                         If not, it will render nav buttons*/}
//                     <h1 style={{ textAlign: "center" }}>Join Us</h1>
//                     <h6 style={{ textAlign: "center" }}>
//                         {`As A ${this.state.accountType === "student" ? "Student" : "Teacher"}`}
//                     </h6>
//                     {formType}
//                     <CurrentSignUpFormPage
//                         {...this.state}
//                         handleChange={this.handleChange}
//                         handleFocus={this.handleFocus} />
//                     {this.state.formPage === 1 ? manualLoginBtn : navButtons}
//                 </form>
//             </div>
//         )
//     }
// }
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