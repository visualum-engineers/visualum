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

import Form from './Form'
import { passwordCheck } from '../../helpers/passwordCheck'
import { Redirect } from "react-router-dom"

// IMPORTS FOR REDUX
import { useSelector, useDispatch } from 'react-redux';
import { updated } from '../../../redux/features/userInfo/userInfoSlice';

//Regex Expressions to validate Form Inputs
const emailRegex = /.+@.+[\.]{1}.+/;
const numberRegex = /[0-9]{6,}/;
const subscriptionTypeRegex = /[free]|[mid-tier]|[high-tier]|[enterprise]/

//for verification of code, prevents update of state.
//may replace with react hooks 
//for a cleaner verison in future

export default function SignUpForm() {
    const [stage, setStage] = useState(1);
    const [type, setType] = useState('');
    const [isFormComplete, setIsFormComplete] = useState(false);

    const userInfo = useSelector((state) => state.userInfo)
    const dispatch = useDispatch();


    const verifyEmail = (e) => {
        // for verifying email code
        if (numberRegex.test(e)) {
            // Check if code passes, if so
            // Set code in state
            dispatch(updated(["verifiedEmailCode", e]))
            // Return validation that it passed
            return true;
        } else {
            // Or return failure to validate
            return false;
        }
    }
    const verifyClassCode = (e) => {
        // Logic to verify class code and join student to class.
        //Passes down boolean to send them to next page or tell them to retry.
        return true;
    }

    const handleChange = e => {

        //for text, checkbox or select inputs
        if (!e.target) return
        let input = e.target.closest("input")
        let select = e.target.closest("select")
        //checks for input or select element
        let verifySelect = input === undefined || input === null
        let inputId = verifySelect ? select.dataset.state : input.dataset.state
        //check for checkbox inputs
        if (input.type === "checkbox") {
            dispatch(updated([inputId, userInfo[inputId]] === false ? true : false))
        } else {
            let value = e.target.value;
            dispatch(updated([inputId, value]))
        }
    }

    const testEmail = () => {
        const emailTest = emailRegex.test(userInfo.email);
        const passwordTest = passwordCheck(userInfo.password, userInfo.verifiedPassword, true);
        return emailTest && passwordTest;
    }

    const handleStageChange = newStage => {
        // Checking if we are on manual form and we are trying to go to the next step
        if (stage === 2 && newStage === 3) {
            if (testEmail()) {
                setStage(newStage);
            } else {
                console.log("ERROR");
                setStage(2)
            }
        } else {
            setStage(newStage);
        }
    }

    const handleTypeChange = (type) => {
        setType(type);
    }

    const handleSelect = (e) => {
        const value = e.target[e.target.options.selectedIndex].value;
        dispatch(updated(["exposureToUs", value]))
    }

    const completeForm = () => {
        setIsFormComplete(true);
    }

    return (
        <div className="form-page">
            <div className="form-container">
                <Form
                    isFormComplete={isFormComplete}
                    userInfo={userInfo}
                    stage={stage}
                    type={type}
                    handleStageChange={handleStageChange}
                    handleTypeChange={handleTypeChange}
                    handleSelect={handleSelect}
                    handleChange={handleChange}
                    verifyEmail={verifyEmail}
                    verifyClassCode={verifyClassCode}
                    completeForm={completeForm}
                />
            </div>
            {isFormComplete && <Redirect to="/" />}
        </div>
    )
}
