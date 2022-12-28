import React, { Component } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'



export default class Admin extends Component {


    logout = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in"

    }


    render() {
        return (
            <div>

                <h1 className='auth-wrapper' color='Blue'>Admin Dashboard</h1>


                <Link className="nav-link" to={'/adminsetmeter'}>
                    Set Meter Reading
                </Link>
                {/* <Link className="nav-link" to={'/userPayView'}>
                    View/Pay bills
                </Link>
                <Link className="nav-link mb-3" to={'/userTopup'}>
                    Account Topup
                </Link> */}





                <button className="btn btn-primary" onClick={this.logout}>Logout</button>


            </div>



        );
    }
}

