import React, { Component } from 'react'
import { isAuthenticatedToken } from "../core/Menu";
import { withRouter } from "react-router-dom";
class DeleteUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    deleteAccount = () => {
        const token = isAuthenticatedToken()
        const userId = this.props.userId
        this.remove(userId, token)
        console.log("delete account")
    }

    remove = (userId, token) => {
        fetch(`http://localhost:8080/api/user/${userId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    console.log(data)

                    localStorage.removeItem("jwt")
                    localStorage.removeItem("user")
                    console.log(this.props)
                    this.props.history.push('/signin');

                }
            })
    }

    deleteConfirmed = () => {
        let answer = window.confirm("Are You Sure you Want To delete your account?")
        if (answer) {
            this.deleteAccount()
        }
    }
    render() {
        return (
            <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger" >Delete Profile</button>
        )
    }
}

export default withRouter(DeleteUser)
