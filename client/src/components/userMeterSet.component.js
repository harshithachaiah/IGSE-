import React, { Component } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'



export default class UserMeterSet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datevalue: "",
            daymeterreading: "",
            nightmeterreading: "",
            gasmeterreading: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(e) {

        e.preventDefault();
        const { datevalue, daymeterreading, nightmeterreading, gasmeterreading } = this.state;
        console.log(datevalue, daymeterreading, nightmeterreading, gasmeterreading);
        fetch("http://localhost:4000/usermeterset", {
            method: "post",
            croossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                datevalue,
                daymeterreading,
                nightmeterreading,
                gasmeterreading,


            }),
        }).then((res) => res.json())
            .then((data) => {



                if (data.status === "ok") {
                    console.log(data, "New meter reading submitted");
                    alert("Readings Successfull submitted")
                    window.location.href = "./userHomepage"

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
        const date = new Date();
        date.getDate();
        const defaultValue = date.toLocaleDateString('en-CA');
        return (
            <div >

                <h3 className='auth-wrapper' color='Grey'>Enter Your Meter Readings</h3>

                {/* Name<h1>{this.state.userData.fname}</h1> */}
                {/* Email<h3>{this.state.userData.email}</h3> */}
                <label>Select the date </label><br />
                <input

                    className='mb-3'
                    defaultValue={defaultValue}
                    type="date"
                    name="datepic"
                    placeholder="DateRange"
                    onChange={(e) => this.setState({ datevalue: e.target.value })}

                />





                <label>Electricity meter reading - Day</label>
                <input type='number'
                    required
                    placeholder='e.g. 100 kWh'
                    min={0}
                    onChange={e => this.setState({ daymeterreading: e.target.value })}
                    className='form-control mb-3'
                />

                <label>Electricity meter reading - Night</label>
                <input type='number'
                    required
                    placeholder='e.g. 250 kWh'
                    min={0}
                    onChange={e => this.setState({ nightmeterreading: e.target.value })}
                    //value={this.state.}
                    className='form-control mb-3'
                />

                <label>Gas meter reading</label>
                <input type='number'
                    required
                    placeholder='e.g. 800 kWh'
                    min={0}
                    onChange={e => this.setState({ gasmeterreading: e.target.value })}
                    className='form-control mb-3'
                />




                <div className="d-grid">
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary mt-3 mb-3">
                        Submit
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

