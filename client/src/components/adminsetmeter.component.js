import React, { Component } from 'react'

export default class AdminSetMeter extends Component {
    constructor(props) {
        super(props);
        this.state = {

            electricityday: "",
            electricitynight: "",
            gas: "",
            standingcharge: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleSubmit(e) {

        e.preventDefault();
        const { electricityday, electricitynight, gas, standingcharge } = this.state;
        console.log(electricityday, electricitynight, gas, standingcharge);
        fetch("http://localhost:4000/tariff", {
            method: "post",
            croossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                electricityday,
                electricitynight,
                gas,
                standingcharge,



            }),
        }).then((res) => res.json())
            .then((data) => {



                if (data.status === "ok") {
                    console.log(data, "Tariff Updated");
                    alert("Tariff Updated")
                    window.location.href = "./admin"

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

                <h1 className='auth-wrapper' color='Grey'>Update Tariff</h1>
                <label>Electricity meter reading - Day (/kWh)</label>
                <input type='number' min='0'
                    placeholder='/kWh'
                    onChange={e => this.setState({ electricityday: e.target.value })}

                    className='form-control form-group mb-3'
                />

                <label>Electricity meter reading - Night (/kWh)</label>
                <input type='number' min='0'
                    placeholder='/kWh'
                    onChange={e => this.setState({ electricitynight: e.target.value })}
                    className='form-control form-group mb-3'
                />


                <label>Gas meter reading (/kWh)</label>
                <input type='number' min='0'
                    placeholder='/kWh'
                    onChange={e => this.setState({ gas: e.target.value })}
                    className='form-control form-group mb-3'
                />

                <label>Standing Charge (/kWh)</label>
                <input type='number' min='0'
                    placeholder='/kWh'
                    onChange={e => this.setState({ standingcharge: e.target.value })}
                    className='form-control form-group mb-3'
                />

                <div className="d-grid mb-3" >
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">
                        Submit
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

