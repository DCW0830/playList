import React, { Component } from 'react';
import ProfilePage from './profile_components/profile_page'

class HomePage extends Component {

  state = {
    profilePage: false
  }

  render() {
    return (
      <div>
        {this.state.profilePage ? <ProfilePage/> : <div onClick={()=>this.setState({profilePage: true})}>Click Me to Sign In</div>}
      </div>
    )
  }
}
export default HomePage
