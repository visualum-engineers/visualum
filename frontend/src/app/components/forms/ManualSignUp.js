import React from "react"
import { useSelector, useDispatch } from 'react-redux';
//import { updated } from '../../../redux/features/userInfo/userInfoSlice';

export default function ManualSignUp(props) {
    const userInfo = useSelector((state) => state.userInfo)
    //const dispatch = useDispatch();

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <div className="form-floating">
                        <input
                            placeholder="Email Address"
                            value={userInfo.email}
                            data-state="email"
                            onChange={props.handleChange}
                            type="email"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp" />
                        <label htmlFor="email" className="form-label">Email Address</label>
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="form-floating mt-3">
                        <input
                            placeholder="Password"
                            value={userInfo.password}
                            onFocus={props.handleFocus}
                            data-state="password"
                            onChange={props.handleChange}
                            type="password"
                            className="form-control"
                            id="password" />
                        <label style={{ color: "black" }} htmlFor="password" className="form-label">Password</label>
                    </div>
                </div>
                <div className="col-lg-6 col-12">
                    <div className="form-floating mt-3">
                        <input
                            placeholder="Re-enter Password"
                            value={userInfo.verifiedPassword}
                            onFocus={props.handleFocus}
                            data-state="verifiedPassword"
                            onChange={props.handleChange}
                            type="password"
                            className="form-control"
                            id="verifiedPassword" />
                        <label htmlFor="verifiedPassword" className="form-label">Re-enter Password</label>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <div className="form-check">
                        <input
                            value={userInfo.rememberMe}
                            data-state="rememberMe"
                            onChange={props.handleChange}
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                    </div>
                </div>
            </div>
            <div className="row mt-3 d-flex justify-content-around">
                <button
                    className="col-5 btn btn-secondary"
                    onClick={() => { props.handleStageChange(1) }}
                >
                    Back
                </button>
                <button
                    className="col-5 btn btn-primary"
                    onClick={() => { props.handleStageChange(3) }}
                >
                    Continue
                </button>
            </div>
        </div>
    )
}