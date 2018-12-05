import React from 'react'

const VideoDetail = ({playAll, video, addToPlaylist, playAllIdsUrl}) => {
  if (!video) {
    return <div>Loading...</div>
  }

  const videoId = video.id.videoId
  let url = `https://www.youtube.com/embed/${videoId}`

  return (
    <div className="video-detail col-md-8">
      <center><h2>Playlist Player</h2></center>
      <div className="embed-responsive embed-responsive-16by9">

        <iframe className="embed-responsive-item" title={video.snippet.title}  src={playAllIdsUrl}></iframe>
      </div>
      <br/>
      <center><h2>Selected Video Player</h2></center>
      <div className="embed-responsive embed-responsive-16by9">

        <iframe className="embed-responsive-item" title={video.snippet.title}  src={url}></iframe>
      </div>
      <div className="button">
        <br/>
          <button onClick={()=> addToPlaylist(video)}>Add to Playlist</button>
      </div>
    </div>
  )
}

export default VideoDetail
