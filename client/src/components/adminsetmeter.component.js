import React, { Component } from 'react'

export default class AdminSetMeter extends Component {
    logout = () => {
        window.localStorage.clear();
        window.location.href = "./sign-in"

    }

    render() {


        return (
            <div>

                <h1 className='auth-wrapper' color='Grey'>Set Meter Reading</h1>
                <label>Electricity meter reading - Day (kWh)</label>
                <input type='number' min='0'
                    placeholder='100 kWh'
                    onChange={this.changeMeterReading}
                    //value={this.state.}
                    className='form-control form-group mb-3'
                />

                <label>Electricity meter reading - Night (kWh)</label>
                <input type='number' min='0'
                    placeholder='kWh'
                    onChange={this.changeMeterReading}
                    //value={this.state.}
                    className='form-control form-group mb-3'
                />


                <label>Gas meter reading (kWh)</label>
                <input type='number' min='0'
                    placeholder='kWh'
                    onChange={this.changeMeterReading}
                    //value={this.state.}
                    className='form-control form-group mb-3'
                />

                <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>

                <button className="btn btn-primary mb-3" onClick={this.logout}>Logout</button>



            </div>
        );
    }
}

