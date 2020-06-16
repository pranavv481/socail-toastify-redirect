import React, { Component } from 'react'
import { isAuthenticated } from "../core/Menu";
import { isAuthenticatedToken } from "../core/Menu";
class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            email: ""
        }
    }

    init = userId => {
        const token = isAuthenticatedToken;
        read(userId, token).then(data => {
            if (data.error) {

            } else {
                this.setState({ id: data._id, name: data.name, email: data.email })
            }
        })
    }


    render() {
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
            </div>
        )
    }
}

export default EditProfile
