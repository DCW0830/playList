import React, { Component } from 'react';
import ProfilePage from './profile_components/profile_page'
import SignIn from './signin.js'



class HomePage extends Component {

  state = {
    profilePage: false,
    createdPlaylists: {},
    loggedInUserID: null
  }

  setUser = id => this.setState({loggedInUserID: id})

  render() {
    return (
      <div>
        {this.state.loggedInUserID ? <ProfilePage/> : <SignIn setUser={this.setUser}/>}
      </div>
    )
  }
}
export default HomePage
