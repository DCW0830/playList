import React, { Component } from 'react';
import ProfilePage from './profile_components/profile_page'
import PartyPage from './profile_components/party_page'
import SignIn from './signin.js'
import EditNewPage from './profile_components/edit_playlist_components/edit_new_page.js'
import API_URL from '../Constants/backend_url.js'
import { ActionCableProvider } from 'react-actioncable-provider'



class HomePage extends Component {

  state = {
    pageIndex: 0,
    createdPlaylists:[],
    loggedInUserID: null,
    currentUser: {name:"No Name"},
    selectedPlaylistId: null
  }

  updatePageIndex = index => this.setState({pageIndex:index}, () => console.log(this.state.createdPlaylists))

  generateBlankPlaylist = () => this.setState({selectedPlaylistId: null, pageIndex: 2})

  setUser = (user,id, playlists) => {
    let newState = playlists ? {currentUser:user,loggedInUserID: id, createdPlaylists: [...this.state.createdPlaylists, ...playlists],pageIndex: 1} : {currentUser:user,loggedInUserID: id, pageIndex: 1}
    this.setState(newState)
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

  onClickPlaylist = event => this.setState({selectedPlaylistId: event.currentTarget.id}, () => this.updatePageIndex(2))

  renderCorrectPage(){
    switch(this.state.pageIndex){
      case 0:
        return <SignIn setUser={this.setUser} updatePageIndex = {this.updatePageIndex}/>
      case 1:
        return <ProfilePage user={this.state.currentUser} playlists={this.state.createdPlaylists} generateBlankPlaylist={this.generateBlankPlaylist} onClickPlaylist={this.onClickPlaylist} updatePageIndex={this.updatePageIndex}/>
      case 2:
        return <EditNewPage key={this.state.selectedPlaylistId} updatePageIndex={this.updatePageIndex} addPlaylist={this.addPlaylist} videos={this.state.selectedPlaylistId ? this.state.createdPlaylists.find(pl => pl.id == this.state.selectedPlaylistId).songsInPlaylist.map(vid => vid.video) : []}/>
      case 3:
        return <PartyPage/>
      default:

        // Log some error here.
        return <h1> Error Could not find page </h1>
    }
  }

  render() {
    return (
      <ActionCableProvider url={"ws://localhost:3000/cable"}>
      <div>
        {this.renderCorrectPage()}
      </div>
    </ActionCableProvider>


    )
  }
}
export default HomePage
