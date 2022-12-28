import React, { Component } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'



export default class UserPayView extends Component {


    logout = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in"

    }


    render() {

        return (
            <div>

                <h3 className='auth-wrapper' color='Grey'>View/Pay Bills</h3>







                <label >Electricity meter reading - Day</label>


                <label>Electricity meter reading - Night</label>


                <label>Gas meter reading</label>





                <div className="d-grid">
                    <button type="submit" className="btn btn-primary mt-3 mb-3">
                        Pay
                    </button>
                </div>



                <div className="mb-3">
                    <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                </div>

                <p className="text-right">
                    <a href="/userHomepage">Go back </a>
                </p>

            </div>




        );
    }
}

