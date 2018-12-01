import React from 'react'

const VideoDetail = ({video, addToPlaylist}) => {
  if (!video) {
    return <div>Loading...</div>
  }

  const videoId = video.id.videoId
  const url = `https://www.youtube.com/embed/${videoId}`
  return (
    <div className="video-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" title={video.snippet.title} src={url}></iframe>
      </div>
      <div className="details">
        <div>{video.snippet.description}</div>
      </div>
      <div className="button">
        <br/>
          <button onClick={()=> addToPlaylist(video)}>Add to Playlist</button>
      </div>
    </div>
  )
}

export default VideoDetail
