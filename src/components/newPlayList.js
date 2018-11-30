import React, {Component} from 'react'
import PlayListItems from './playListItems'

class NewPlayList extends Component {

  state={
    playlistName: '',
  }

  createPlayListItems = () => {
    return playList.map(videoObj => {
      return <PlayListItems handleDelete={handleDelete} key={videoObj.etag} videoObj={videoObj} />
    })
  }

  render() {
    const {playList, handleDelete} = this.props
    return (
      <div>
        <form>
          <input type='text'>Playlist Name: </input>
          <ul className= "col-md-4 list-group">
            {this.createPlayListItems()}
          </ul>
          <input type='Submit'>Submit Playlist</input>
        </form>
      </div>
    )
  }
}

export default NewPlayList
