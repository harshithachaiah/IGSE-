import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customerid: "",
      password: "",
      address: "",
      propertytype: "",
      bedrooms: "",
      voucher: ""


    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    const { customerid, password, address, propertytype, bedrooms, voucher } = this.state;
    console.log(customerid, password, address, propertytype, bedrooms, voucher);
    fetch("http://localhost:4000/register", {
      method: "post",
      croossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        customerid,
        password,
        address,
        propertytype,
        bedrooms,
        voucher

      }),
    }).then((res) => res.json())
      .then((data) => {

        if (data.error === "User Exists") {

          alert("Customer ID Exists")
        }

        if (data.error === "Not a valid voucher") {

          alert("Enter valid voucher")
        }

        if (data.error === "Voucher Already used") {

          alert("Voucher Already used")
        }

        else if (data.status === "ok") {
          console.log(data, "user Registered");
          alert("Registration successfull")
          window.location.href = "./sign-in"
        }
        else {
          alert("Enter Valid Details")
        }

      })

  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>

        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              IGSE
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </nav>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>Customer ID</label>
          <input type='email'
            placeholder='Enter Email ID'
            className='form-control form-group'
            onChange={e => this.setState({ customerid: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type='password'
            required
            placeholder='Enter Password'
            className='form-control form-group'
            onChange={e => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input type='text'
            required
            placeholder='Enter Address'
            className='form-control form-group'
            onChange={e => this.setState({ address: e.target.value })}
          />
        </div>



        <div className="mb-3">

          <label for="Property Type">Property Type</label>

          <select required onChange={e => this.setState({ propertytype: e.target.value })} className='form-control form-group' name="Property Type" id="Property Type">
            <option value="detached">detached</option>
            <option value="semi-detached">semi-detached</option>
            <option value="terraced">terraced</option>
            <option value="flat">flat</option>
            <option value="cottage">cottage</option>
            <option value="bungalow">bungalow</option>
            <option value="mansion">mansion</option>
          </select>
        </div>


        <div className="mb-3">
          <label>Bedrooms</label>
          <input type='number'
            required
            min={0}
            placeholder='Number of bedrooms'
            className='form-control form-group'
            onChange={e => this.setState({ bedrooms: e.target.value })}
          />

        </div>

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
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}
