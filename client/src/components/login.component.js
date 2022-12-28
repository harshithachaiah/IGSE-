import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


export default class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      customerid: "",
      password: "",

    };
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  handleSubmit(e) {
    e.preventDefault();
    const { customerid, password } = this.state;
    console.log(this.state)

    fetch("http://localhost:4000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json",

      },
      body: JSON.stringify({

        customerid,
        password
      }),

    }).then((res) => res.json())

      .then((data) => {
        console.log(data, "user registered")
        if (data.error === "Invalid Customer ID") {

          alert("Invalid Customer ID")
        }

        else if (data.error === "invalid credentials") {
          alert("Invalid password")

        }

        else if (data.status === "ok") {

          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          if (customerid == "gse@shangrila.gov.un") {
            alert("Logged in as an Admin")
            window.location.href = "./admin"
          }
          else {
            alert("Login successful")
            window.location.href = "./userHomepage"
          }

        }
        // else {

        //   alert("invalid credentials")


        // }
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
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email ID</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ customerid: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
}
