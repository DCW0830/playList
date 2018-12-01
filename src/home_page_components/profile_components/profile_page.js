import React, { Component } from 'react';
import EditNewPage from './edit_playlist_components/edit_new_page'

class ProfilePage extends Component {
  state = {
    editNewPage: false
  }

  render() {
    return (
      <div>
        {this.state.editNewPage ? <EditNewPage/> : <div onClick={()=>this.setState({editNewPage: true})}>This is the Profile Page, click me to go to the new and edit playlist page</div>}
      </div>
    )
  }
}
export default ProfilePage
