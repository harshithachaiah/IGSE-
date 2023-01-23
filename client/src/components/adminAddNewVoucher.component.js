import React, { Component } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


export default class AdminAddVoucher extends Component {

    constructor(props) {
        super(props);
        this.state = {

            voucher: "",
            amount: ""

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleSubmit(e) {

        e.preventDefault();
        const { voucher, amount } = this.state;
        console.log(voucher, amount);
        fetch("http://localhost:4000/voucher", {
            method: "post",
            croossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                voucher,
                amount


            }),
        }).then((res) => res.json())
            .then((data) => {



                if (data.status === "ok") {
                    console.log(data, "Voucher Added");
                    alert("Voucher Added")
                    //window.location.href = "./admin"

                }
                else if (data.error === "Voucher Exists") {

                    alert("Voucher Exists")
                }
                else {
                    alert("Please try again")
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

                <h1 className='auth-wrapper' color='Blue'>Add Voucher</h1>
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

                <label>Voucher Value</label>
                <input type='number' min='0'
                    placeholder='Enter the amount in £'
                    onChange={e => this.setState({ amount: e.target.value })}
                    className='form-control form-group mb-3'
                />


                <div className="d-grid mb-3">
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">
                        Add
                    </button>
                </div>

                <p className="text-right">
                    <a href="/admin">Go back </a>
                </p>


                <button className="btn btn-primary mb-3" onClick={this.logout}>Logout</button>



            </div>



        );
    }
}

