import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import { Redirect, browserHistory } from "react-router-dom";
import "../App.css";
class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            loading: false
        }
    }

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    clickSubmit = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        const { email, password } = this.state
        const user = {
            email,
            password
        }
        if (user.email === "" || user.password === "") {
            this.setState({ loading: false })
            toast("Field Are Invalid", { type: toast.TYPE.ERROR, autoClose: 1000 })
        }
        this.signin(user)

    }

    signin = (user) => {
        return fetch("http://localhost:8080/api/signin", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    this.setState({ loading: false })
                    console.log(data.error)
                    toast(data.error, { type: toast.TYPE.ERROR, autoClose: 1000 },)
                    this.setState({
                        email: "",
                        password: ""
                    })
                } else {
                    if (data.token) {
                        this.setState({ loading: false })
                        toast("Successfully Signin", { type: toast.TYPE.SUCCESS, autoClose: 1000 })

                        this.setState({
                            email: "",
                            password: ""
                        })
                        this.state.loginin = true
                        localStorage.setItem("jwt", JSON.stringify(data.token))
                        localStorage.setItem("user", JSON.stringify(data.user))

                        if (localStorage.getItem('jwt')) {
                            this.props.history.push('/');
                        }
                    }

                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { email, password, loading } = this.state

        return (


            <div className="container">
                <ToastContainer />
                {
                    loading ? <div className="loader-container">
                        <div className="loader"></div>
                    </div> : ""
                }


                <h1 className="mb-5 mt-5">Signin</h1>

                <form>

                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="text" placeholder="email" className="form-control" value={email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="text" placeholder="password" className="form-control" value={password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        SignIn
                    </button>
                </form>

            </div>

        );
    }
}

export default Signin;