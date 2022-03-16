import React, { Component } from 'react'

//Automates changing year
let d = new Date()
let time = d.getFullYear()

export default class Footer extends Component {
    render() {
        return (
            <footer className="w-100"  id="footer">
                <div className="d-flex justify-content-center flex-wrap py-2">
                    <div className="col-sm-3 col-12 text-center py-3">
                        <h5>Visualum</h5>
                        <div className="d-flex flex-column align-items-center">
                            <a className="foot-link" href="#footer">For Teachers</a>
                            <a className="foot-link" href="#footer">For Students</a>
                            <a className="foot-link" href="#footer">For Enterprise</a>
                        </div>
                    </div>

                    <div className="col-sm-3 col-12 text-center py-3">
                        <h5>Social</h5>
                        <div className="d-flex flex-column align-items-center">
                            <a className="foot-link" href="#footer">LinkedIn</a>
                            <a className="foot-link" href="#footer">Instagram</a>
                            <a className="foot-link" href="#footer">Facebook</a>
                        </div>
                    </div>

                    <div className="col-sm-3 col-12 text-center py-3">
                        <h5>About</h5>
                        <div className="d-flex flex-column align-items-center">
                            <a className="foot-link" href="#footer">Terms</a>
                            <a className="foot-link" href="#footer">Contact Us</a>
                            <a className="foot-link" href="#footer">Meet the Team</a>
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
