import React, { Component } from 'react'

export default class UserDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: "",
        }
    };

    componentDidMount() {

        fetch("http://localhost:3000/userData", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",

            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
            }),

        }).then((res) => res.json())

            .then((data) => {
                console.log(data, "userData")
                this.setState({ userData: data.data })
            })

    }

    render() {
        return (
            <div>

                <h1 className='auth-wrapper' color='Grey'>User Info</h1>
                Name<h1>{this.state.userData.fname}</h1>
                Email<h3>{this.state.userData.email}</h3>

            </div>
        );
    }
}

