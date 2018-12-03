import React, { Component } from 'react';
import _ from 'lodash'
import SearchBar from './search_bar';
import VideoList from './video_list'
import VideoDetail from './video_detail'
import NewPlaylist from './new_playlist'
import YTSearch from 'youtube-api-search';
import API_KEY from './.API.js'


class EditNewPage extends Component {
  constructor(props) {
    super(props)
    this.state={
      videos: [],
      selectedVideo: null,
      playlist: []
    }
    this.videoSearch('')
  }

  createThePlaylist = (playlistName) => {
    let playlist = {title: playlistName, playlist: this.state.playlist}
    this.props.addPlaylist(playlist)
    debugger
    this.setState({playlist: []})
  }

  handleDelete = (etag) => {
    let updatedPlaylist = this.state.playlist.filter(videoObj=> {
      return videoObj.etag !== etag
    })
    this.setState({
      playlist: updatedPlaylist
    })
  }

  addToPlaylist = (video) => {
    this.setState({
      playlist: [...this.state.playlist, video]
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
        {this.state.playlist[0]? <NewPlaylist
         createThePlaylist={this.createThePlaylist}
         handleDelete={this.handleDelete}
         playlist={this.state.playlist}
        /> : null}

        <VideoDetail addToPlaylist={this.addToPlaylist}
          video={this.state.selectedVideo}
        />
        <VideoList
          onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
          videos={this.state.videos}
        />

        <button onClick={() => this.props.updatePageIndex(1)}> back to profile page </button>
      </div>
    );
  }
}
export default EditNewPage
