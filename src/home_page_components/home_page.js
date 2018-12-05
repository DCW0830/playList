import React, { Component } from 'react';
import ProfilePage from './profile_components/profile_page'
import PartyPage from './profile_components/party_page'
import SignIn from './signin.js'
import EditNewPage from './profile_components/edit_playlist_components/edit_new_page.js'
import API_URL from '../Constants/backend_url.js'
import { ActionCableProvider } from 'react-actioncable-provider'

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

class HomePage extends Component {

  state = {
    pageIndex: 0,
    createdPlaylists:[],
    loggedInUserID: null,
    currentUser: {name:"No Name"},
    selectedPlaylistId: null
  }

  updatePageIndex = index => this.setState({pageIndex:index})

  generateBlankPlaylist = () => this.setState({selectedPlaylistId: null}, () => this.redirect_to('edit'))

  setUser = (user,id, playlists) => {
    // this.props.history.push('/test')
    let newState = playlists ? {currentUser:user,loggedInUserID: id, createdPlaylists: [...this.state.createdPlaylists, ...playlists],pageIndex: 1} : {currentUser:user,loggedInUserID: id, pageIndex: 1}
    this.setState(newState, () => this.props.history.push('/home'))
  }

  handleDelete = (id) => {
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

  onClickPlaylist = event => this.setState({selectedPlaylistId: event.currentTarget.id}, () => this.redirect_to("edit"))

  redirect_to = location => this.props.history.push(`/${location}`)

  render() {
    return (
      <ActionCableProvider url={"ws://localhost:3000/cable"}>
      <div>
        <Switch>
          <Route exact path="/" render={props => <Redirect to="/signin"/>}/>
          <Route exact path="/signin" render={props => <SignIn setUser={this.setUser} updatePageIndex = {this.updatePageIndex}/>}/>
          <Route exact path="/home" render={props => <ProfilePage handleDelete={this.handleDelete} user={this.state.currentUser} playlists={this.state.createdPlaylists} generateBlankPlaylist={this.generateBlankPlaylist} onClickPlaylist={this.onClickPlaylist} updatePageIndex={this.updatePageIndex}/>}/>
          <Route exact path="/edit" render={props => <EditNewPage key={this.state.selectedPlaylistId} updatePageIndex={this.updatePageIndex} redirect_to={this.redirect_to} addPlaylist={this.addPlaylist} videos={this.state.selectedPlaylistId ? this.state.createdPlaylists.find(pl => pl.id == this.state.selectedPlaylistId).songsInPlaylist.map(vid => vid.video) : []}/>}/>
          <Route path="/party" render={props => <p>Party Page</p>}/>
        </Switch>
      </div>
      </ActionCableProvider>

    )
  }
}
export default withRouter(HomePage)
