import React, { Component } from 'react'


export default class AdminMeterRead extends Component {


    constructor(props) {
        super(props);
        this.state = {
            meterData: []
        }
    };

    componentDidMount() {
        fetch("http://localhost:4000/all-meterreadings", {
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
                    this.setState({ meterData: data })
                    console.log(this.state.meterData)

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
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className='mr-3'>Customer ID</th>
                            <th>Day Reading</th>
                            <th>Night Reading</th>
                            <th>Gas Reading</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.meterData.map(m => (
                            <tr key={m._id}>
                                <td>{m.customerId}</td>
                                <td>{m.daymeterreading}</td>
                                <td>{m.nightmeterreading}</td>
                                <td>{m.gasmeterreading}</td>
                                <td>{m.payment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="text-right">
                    <a href="/admin">Go back </a>
                </p>

                <button className="btn btn-primary mb-3" onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

