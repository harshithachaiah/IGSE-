import React, { Component } from 'react'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'



export default class UserTopup extends Component {


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
                    //onChange={e => this.setState({ voucher: e.target.value })}
                    />
                </div>



                <div className="d-grid">
                    <button type="submit" className="btn btn-primary mt-3 mb-3">
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

