import React, { Component } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'



export default class UserPayView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meterData: "",
        }
    };

    componentDidMount() {



        fetch("http://localhost:4000/usermeterdata", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",

            },
            body: JSON.stringify({
                customerid: window.localStorage.getItem("customerid"),
            }),

        }).then((res) => res.json())

            .then((data) => {
                if (data.error === "No Readings") {

                    // alert("No Reading available for this user")
                    window.location.href = "./userPayViewNull"
                }
                else {

                    console.log(data, "meterData")
                    this.setState({ meterData: data.data })

                }
            })
    }

    logout = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in"

    }


    render() {

        return (
            <div>

                <h3 className='auth-wrapper' color='Grey'>View/Pay Bills</h3>
                <h5 className='auth-wrapper' color='Grey'>Latest Bill</h5>


                <label >Date of Reading submission</label>
                <p>{this.state.meterData.datevalue}</p>

                <label >Electricity meter reading - Day</label>
                <p>{this.state.meterData.daymeterreading}</p>

                <label>Electricity meter reading - Night</label>
                <p>{this.state.meterData.nightmeterreading}</p>

                <label>Gas meter reading</label>
                <p>{this.state.meterData.gasmeterreading}</p>

                <label>Payment Status:</label>

                <p >{this.state.meterData.payment}</p>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary mt-3 mb-3">
                        Pay
                    </button>
                </div>

                <p className="text-right">
                    <a href="/userHomepage">Go back </a>
                </p>

                <div className="mb-3">
                    <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                </div>

            </div>

        );
    }
}

