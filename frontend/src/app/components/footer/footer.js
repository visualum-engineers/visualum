import React, { Component } from 'react'

//Automates changing year
let d = new Date()
let time = d.getFullYear()

export default class Footer extends Component {
    render() {
        return (
        <footer>
            <div id="footer" className="d-flex flex-wrap py-2">
                <div className="col-sm-4 col-12 text-center py-3">
                    <h5>Visualum</h5>
                    <div className="d-flex flex-column align-items-center">
                        <a className="foot-link" href="#">For Teachers</a>
                        <a className="foot-link" href="#">For Students</a>
                        <a className="foot-link" href="#">For Enterprise</a>
                    </div>
                </div>

                <div className="col-sm-4 col-12 text-center py-3">
                    <h5>Social</h5>
                    <div className="d-flex flex-column align-items-center">
                        <a className="foot-link" href="#">LinkedIn</a>
                        <a className="foot-link" href="#">Instagram</a>
                        <a className="foot-link" href="#">Facebook</a>
                    </div>
                </div>

                <div className="col-sm-4 col-12 text-center py-3">
                    <h5>About</h5>
                    <div className="d-flex flex-column align-items-center">
                        <a className="foot-link" href="#">Terms</a>
                        <a className="foot-link" href="#">Contact Us</a>
                        <a className="foot-link" href="#">Meet the Team</a>
                    </div>
                </div>
            </div>

            <div id="copyright" className="row">
                <div className="text-center">
                    <p><i className="fa fa-copyright"></i> {time} Visualum All rights reserved </p>
                </div>
            </div>
        </footer>

        )
    }
}
