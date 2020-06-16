import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DefaultProfile from "../images/default.jpg";
class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8080/api/users`, {
            method: "GET",

        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    console.log(data)
                    this.setState({ users: data })
                }

            })
            .catch(err => console.log(err))
    }


    render() {
        const { users } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Users</h2>
                <div className="row">

                    {

                        users.map(user =>
                            <div className="card col-md-3" key={user._id} >
                                <img className="card-img-top" src={DefaultProfile} alt="user name" />
                                <div className="card-body">
                                    <h5 className="card-title"> {user.name}</h5>
                                    <p className="card-text">{user.email}</p>
                                    <Link to={`user/${user._id}`} className="btn btn-raised btn-primary btn-sm">Go somewhere</Link>
                                </div>

                            </div>
                        )

                    }
                </div>

            </div>
        )
    }

}




export default Users
