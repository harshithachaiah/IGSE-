import React, { Component } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'



export default class UserTopup extends Component {

    constructor(props) {
        super(props);
        this.state = {

            voucher: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(e) {

        e.preventDefault();
        const { voucher } = this.state;
        console.log(voucher);
        fetch("http://localhost:4000/topup", {
            method: "post",
            croossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({

                voucher,
                customerid: window.localStorage.getItem("customerid")


            }),
        }).then((res) => res.json())
            .then((data) => {

                if (data.error === "Not a valid voucher") {

                    alert("Enter valid voucher")
                }

                if (data.error === "Voucher Already used") {

                    alert("Voucher Already used")
                }


                if (data.status === "ok") {
                    console.log(data, "Topup Successfull");
                    alert("Topup Successfull")
                    window.location.href = "./userHomepage"

                }
                // else {
                //     alert("Please try again")
                // }

            })


    }


    logout = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in"

    }


    render() {

        return (
            <div>

                <h3 className='auth-wrapper' color='Grey'>Topup</h3>


                <div className="mb-3">
                    <label>Voucher</label>
                    <input type='text'
                        required
                        minLength={8}
                        placeholder='Enter Valid Voucher'
                        className='form-control form-group'
                        onChange={e => this.setState({ voucher: e.target.value })}
                    />
                </div>



                <div className="d-grid">
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary mt-3 mb-3">
                        Topup
                    </button>
                </div>



                <div className="mb-3">
                    <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                </div>

                <p className="text-right">
                    <a href="/userHomepage">Go Back</a>
                </p>

            </div>




        );
    }
}

