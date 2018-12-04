import React, { Component } from 'react';
import ProfilePage from './profile_components/profile_page'
import SignIn from './signin.js'
import EditNewPage from './profile_components/edit_playlist_components/edit_new_page.js'
import API_URL from '../Constants/backend_url.js'

class HomePage extends Component {

  state = {
    pageIndex: 0,
    createdPlaylists:[],
    loggedInUserID: null,
    currentUser: {name:"No Name"}
  }

  updatePageIndex = index => this.setState({pageIndex:index})

  setUser = (user,id, playlists) => {
    let newState = playlists ? {currentUser:user,loggedInUserID: id, createdPlaylists: [...this.state.createdPlaylists, ...playlists],pageIndex: 1} : {currentUser:user,loggedInUserID: id, pageIndex: 1}
    this.setState(newState)
  }

  handleDelete = (id) => {
    console.log(id)
    let filtered = this.state.createdPlaylists.filter(playlistObj => {
      return playlistObj.id !== id
    })
    this.setState({createdPlaylists: filtered})
    fetch(`${API_URL.playlists}/${id}`,
    {method: "DELETE"})
  }

  addPlaylist = playlist => {
    playlist.user_id = this.state.loggedInUserID
    fetch(API_URL.playlists,
    {method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({playlist: playlist})})
    .then(res => res.json())
    .then(playlist => {
      this.setState({createdPlaylists: [playlist, ...this.state.createdPlaylists]})
    })
  }

  renderCorrectPage(){
    switch(this.state.pageIndex){
      case 0:
        return <SignIn setUser={this.setUser} updatePageIndex = {this.updatePageIndex}/>
      case 1:
        return <ProfilePage handleEdit={this.handleEdit} handleDelete={this.handleDelete} user={this.state.currentUser} playlists={this.state.createdPlaylists} updatePageIndex={this.updatePageIndex}/>
      case 2:
        return <EditNewPage updatePageIndex={this.updatePageIndex} addPlaylist={this.addPlaylist}/>
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
      </div>
    )
  }
}
export default HomePage
