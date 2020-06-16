import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            email: "",
            password: "",
        }
    }

    handleChange = (name) => (e) => {
        this.setState({
            [name]: e.target.value
        })
    }

    clickSubmit = (e) => {
        e.preventDefault()
        const { name, email, password } = this.state
        const user = {
            name,
            email,
            password
        }
        this.signup(user)

    }

    signup = (user) => {
        return fetch(`http://localhost:8080/api/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    toast(data.error, { type: toast.TYPE.ERROR })
                    this.setState({
                        name: "",
                        email: "",
                        password: ""
                    })
                } else {
                    toast(data.message, { type: toast.TYPE.SUCCESS })
                    this.setState({
                        name: "",
                        email: "",
                        password: ""
                    })
                    this.props.history.push('/signin');

                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { name, email, password } = this.state
        return (


            <div className="container">
                <ToastContainer autoClose={3000} />
                <h1 className="mb-5 mt-5">Signup</h1>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} type="text" placeholder="name" className="form-control" value={name} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} type="text" placeholder="email" className="form-control" value={email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} type="text" placeholder="password" className="form-control" value={password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        SignUp
                    </button>
                </form>

            </div>

        );
    }
}

export default Signup;