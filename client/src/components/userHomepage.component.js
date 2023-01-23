import React, { Component } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'



export default class UserHomepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userData: "",
        }
    };

    componentDidMount() {

        fetch("http://localhost:4000/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",

            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),

        }).then((res) => res.json())

            .then((data) => {
                console.log(data, "userData")
                this.setState({ userData: data.data })
            })

    }

    logout = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in"

    }

    render() {
        return (
            <div>

                <h1 className='auth-wrapper' color='Blue'>User Dashboard</h1>
                Customer ID<h6>{this.state.userData.customerid}</h6>
                Type of Property <h6>{this.state.userData.propertytype}</h6>
                Bedrooms <h6>{this.state.userData.bedrooms}</h6>
                Balance<h6>£{this.state.userData.credit}</h6><br />

                <Link className="nav-link" to={'/userMeterSet'}>
                    Submit New Meter Reading
                </Link>

                <Link className="nav-link " to={'/userTopup'}>
                    Account Topup
                </Link>

                <Link className="nav-link mb-3" to={'/userPayView'}>
                    View/Pay bills
                </Link>


                <button className="btn btn-primary" onClick={this.logout}>Logout</button>

            </div>

        );
    }
}

