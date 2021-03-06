import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Menu from './core/Menu'
import Profile from './user/Profile'
import Users from './user/Users'
import EditProfile from './user/EditProfile'

const MainRouter = () => {
    return (
        <div>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/user/:userId" component={Profile} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/users/edit/:userId" component={EditProfile} />
            </Switch>
        </div>
    )
}

export default MainRouter
