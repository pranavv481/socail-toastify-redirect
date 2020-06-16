import React, { Component } from 'react'
import { isAuthenticated } from "../core/Menu";
import { isAuthenticatedToken } from "../core/Menu";
import { Link } from 'react-router-dom'
import DefaultProfile from "../images/default.jpg";
import DeleteUser from './DeleteUser';
export class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: ""
        }
    }



    componentDidMount() {
        const userId = this.props.match.params.userId
        fetch(`http://localhost:8080/api/user/${userId}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${isAuthenticatedToken()}`

            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    this.props.history.push('/signin');
                } else {
                    console.log(data)
                    this.setState({ user: data })
                }
            })
    }

    componentWillReceiveProps(props) {
        const userId = props.match.params.userId
        fetch(`http://localhost:8080/api/user/${userId}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${isAuthenticatedToken()}`

            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    this.props.history.push('/signin');
                } else {
                    console.log(data)
                    this.setState({ user: data })
                }
            })
    }

    render() {
        const { user } = this.state
        console.log(user)
        return (
            <div className="container">
                <h2 className="mt-3 mb-3">Profile</h2>
                <div className="row">

                    <div className="col-md-6">

                        <img className="card-img-top" src={DefaultProfile} alt="user name" />

                    </div>

                    <div className="col-md-6">
                        <p>Hello {user.name}</p>
                        <p>Email:{user.email}</p>
                        <p>Created:{new Date(user.created).toDateString()}</p>
                        {isAuthenticated()._id === user._id && (
                            <div className="d-inline-block mt-5">

                                <Link className="btn btn-raised btn-success mr-3" to={`/user/edit/${user._id}`}>Edit Profile</Link>

                                <DeleteUser userId={user._id} />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        )
    }
}

export default Profile
