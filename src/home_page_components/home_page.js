import React, { Component } from 'react';
import ProfilePage from './profile_components/profile_page'



class HomePage extends Component {

  state = {
    pageIndex: 0,
    createdPlaylists: {}
  }

  updatePageIndex = (index) =>{
    this.setState({
      pageIndex:index
    })
  }

  renderCorrectPage(){
    switch(this.state.pageIndex){
      case 0:
        return <div onClick={() => this.updatePageIndex(1)}>Click Me to Sign In</div>
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
