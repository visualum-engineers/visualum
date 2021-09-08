import React, { Component } from 'react';

//contains all Form Buttons
export default class Buttons extends Component{
    render(){
        //make sure the form is not on first page or final page
        const lastPage = this.props.formPage === "final"
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