import React, {Component} from 'react'
import PlayListItems from './playListItems'

class NewPlayList extends Component {

  state = {
    playListName: ''
  }

  createPlayListItems = () => {
    return this.props.playList.map(videoObj => {
      return <PlayListItems handleDelete={this.props.handleDelete} key={videoObj.etag} videoObj={videoObj} />
    })
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Playlist Name:
            <input onChange={(event)=> this.setState({playListName: event.target.value})} value={this.state.playListName} type="text" name="name" />
          </label>
          <ul className= "col-md-4 list-group">
            {this.createPlayListItems()}
          </ul>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default NewPlayList
