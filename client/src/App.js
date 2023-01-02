import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.component'
import SignUp from './components/signup.component'
import UserHomepage from './components/userHomepage.component'
import Admin from './components/admin.component'
import UserMeterSet from './components/userMeterSet.component'
import UserPayView from './components/userPayViewBill.component'
import UserTopup from './components/userTopup.component'
import AdminSetMeter from './components/adminsetmeter.component'
import UserPayViewNull from './components/userPayViewBillNull.component'


function App() {
  //const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <Router>
      <div className="App">
        {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              IGSE Energy APP
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav> */}

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              {/* //isLoggedIn == "true" ? <UserHomepage /> : */}
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userHomepage" element={<UserHomepage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/adminsetmeter" element={<AdminSetMeter />} />

              <Route path="/userMeterSet" element={<UserMeterSet />} />
              <Route path="/userPayview" element={<UserPayView />} />
              <Route path="/userTopup" element={<UserTopup />} />
              <Route path="/userPayViewNull" element={<UserPayViewNull />} />






            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
