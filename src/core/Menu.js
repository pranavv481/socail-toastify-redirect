import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" }
    }
    else {
        return { color: "#ffffff" }
    }
}




// export const signout = () => {

//     return fetch("http://localhost:8080/api/signout", {
//         method: "GET"
//     }).then(res => {
//         if (res.status === 200) {
//             localStorage.removeItem("jwt")
//             localStorage.removeItem("user")

//         }
//         return res.json()
//     })
//         .catch(err => {
//             console.log(err)
//         })
// }

export const isAuthenticated = () => {
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"))
    } else {
        return false
    }
}

export const isAuthenticatedToken = () => {
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}


const Menu = ({ history }) => {
    console.log(isAuthenticated().name)
    return (
        <div>
            <ul className="nav nav-tabs bg-primary" >

                {!isAuthenticated() ?
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">SignUp</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">SignIn</Link>
                        </li>
                    </>
                    :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/users")} to="/users">Users</Link>
                        </li>


                        <li className="nav-item ml-auto" >
                            <a className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }}
                                onClick={() => {
                                    localStorage.removeItem("jwt")
                                    localStorage.removeItem("user")
                                    history.push('/signin')
                                }}
                            >SignOut</a>
                        </li>

                        <li className="nav-item" >
                            <Link to={`/user/${isAuthenticated()._id}`} className="nav-link"
                                style={isActive(history, `/user/${isAuthenticated()._id}`)}

                            >{isAuthenticated().name}</Link>
                        </li>


                    </>
                }


            </ul >
        </div>
    )
}

export default withRouter(Menu)


