import React, { Component } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'



export default class UserPayViewNull extends Component {





    logout = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in"

    }


    render() {

        return (
            <div>

                <h3 className='auth-wrapper' color='Grey'>View/Pay Bills</h3>




                <label >Date of Reading submission</label>
                <p>Null</p>


                <label >Electricity meter reading - Day</label>
                <p>Null</p>



                <label>Electricity meter reading - Night</label>
                <p>Null</p>


                <label>Gas meter reading</label>
                <p>Null</p>









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

