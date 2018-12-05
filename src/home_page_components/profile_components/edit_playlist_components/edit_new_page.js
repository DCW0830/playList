import React, { Component } from 'react';
import _ from 'lodash'
import SearchBar from './search_bar';
import VideoList from './video_list'
import VideoDetail from './video_detail'
import NewPlaylist from './new_playlist'
import YTSearch from 'youtube-api-search';
import API_KEY from './.api.js'

class EditNewPage extends Component {
  constructor(props) {
    super(props)
    this.state={
      videos: [],
      selectedVideo: null,
      playlist: this.props.videos,
      playAll: false,
      playAllIdsUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE?origin=http://example.com%22%20frameborder=%220%22'
    }
    this.videoSearch('')
  }

  clearState = () => {
    this.setState({
      playAll: false
    })
  }

  handlePlayAll = () => {
    let videoIds = this.state.playlist.map(videoObj => {
      return videoObj.id.videoId
    })
    videoIds = videoIds.join(',')
    let videoPlaylistUrl = `https://www.youtube.com/embed/?autoplay=1&playlist=${videoIds}`

    this.setState({
      playAllIdsUrl: videoPlaylistUrl
    }, ()=>console.log(this.state.playAllIdsUrl))
  }

  createThePlaylist = (playlistName) => {
    let playlist = {title: playlistName, playlist: this.state.playlist}
    this.props.addPlaylist(playlist)
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
         handlePlayAll={this.handlePlayAll}
         createThePlaylist={this.createThePlaylist}
         onVideoSelect={selectedVideo=>this.setState({selectedVideo})}
         handleDelete={this.handleDelete}
         playlist={this.state.playlist}
        /> : null}

        <VideoDetail
          clearState={this.clearState}
          playAllIdsUrl={this.state.playAllIdsUrl}
          playAll={this.state.playAll}
          addToPlaylist={this.addToPlaylist}
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
