import React, { Component } from 'react';
import _ from 'lodash'
import SearchBar from './search_bar';
import VideoList from './video_list'
import VideoDetail from './video_detail'
import NewPlayList from './newPlayList'
import YTSearch from 'youtube-api-search';
import API_KEY from './.API.js'

class EditNewPage extends Component {
  constructor(props) {
    super(props)
    this.state={
      videos: [],
      selectedVideo: null,
      playList: []
    }
    this.videoSearch('')
  }
  handleDelete = (etag) => {
    let updatedPlaylist = this.state.playList.filter(videoObj=> {
      return videoObj.etag !== etag
    })
    this.setState({
      playList: updatedPlaylist
    })
  }
  addToPlaylist = (video) => {
    this.setState({
      playList: [...this.state.playList, video]
    })
  }
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       })
    });
  }
  render() {
    const delayedSearch = _.debounce(term =>{this.videoSearch(term)}, 300)
    return (
      <div>
        <SearchBar delayedSearch={delayedSearch} />
        {this.state.playList[0]? <NewPlayList handleDelete={this.handleDelete} playList={this.state.playList}/>:null}

        <VideoDetail addToPlaylist={this.addToPlaylist}
          video={this.state.selectedVideo}
        />
        <VideoList
          onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
          videos={this.state.videos}
        />
      </div>
    );
  }
}
export default EditNewPage
