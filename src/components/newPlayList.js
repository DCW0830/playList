import React, {Component} from 'react'
import PlayListItems from './playListItems'

class NewPlayList extends Component {

  createPlayListItems = () => {
    return this.props.playList.map(videoObj => {
      return <PlayListItems handleDelete={this.props.handleDelete} key={videoObj.etag} videoObj={videoObj} />
    })
  }

  render() {
    return (
      <div>


          <ul className= "col-md-4 list-group">
            {this.createPlayListItems()}
          </ul>


      </div>
    )
  }
}

export default NewPlayList
