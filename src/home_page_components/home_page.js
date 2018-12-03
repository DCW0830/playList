import React, { Component } from 'react';
import ProfilePage from './profile_components/profile_page'
import SignIn from './signin.js'



class HomePage extends Component {

  state = {

    pageIndex: 0,
    createdPlaylists: [],
    loggedInUserID: null
  }

  updatePageIndex = (index) =>{
    this.setState({
      pageIndex:index
    })
  }
  
  setUser = (id, playlists) => this.setState({loggedInUserID: id, createdPlaylists: playlists,pageIndex: 1})

  renderCorrectPage(){
    switch(this.state.pageIndex){
      case 0:
        return <SignIn setUser={this.setUser} updatePageIndex = {this.updatePageIndex}/>
      case 1:
        return <ProfilePage upatePageIndex={this.updatePageIndex}/>
      case 2:
        return <h1> Render Playlist New/Edit Page</h1>
      case 3:
        return <h1> Render Party Page</h1>
      default:

        // Log some error here.
        return <h1> Error Could not find page </h1>
    }
  }

  render() {
    return (
      <div>
        {this.renderCorrectPage()}
        {this.state.page}
      </div>


    )
  }
}
export default HomePage
