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


                <Link className="nav-link mb-10" to={'/adminsetmeter'}>
                    Set Tariff
                </Link>

                <Link className="nav-link " to={'/adminaddvoucher'}>
                    Add New Voucher
                </Link>


                <Link className="nav-link" to={'/adminmeterread'}>
                    View Meter Reading
                </Link>

                <Link className="nav-link" to={'/adminenergystatics'}>
                    View Energy Statistic
                </Link>







                <button className="btn btn-primary" onClick={this.logout}>Logout</button>


            </div>



        );
    }
}

