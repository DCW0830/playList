import React from 'react'

const PlaylistItems = ({video, handleDelete, onVideoSelect}) => {
  const imageUrl = video.snippet.thumbnails.default.url

  return (
    <li className='list-group-item' onClick={()=>onVideoSelect(video)}>
      <div  className="media-right">
        <img className="media-object" alt={video.snippet.title} src={imageUrl} />
        <button onClick={()=>handleDelete(video.etag)}>Remove</button>
      </div>

      <div className="media-body">
        <div className="media-heading">{video.snippet.title}</div>
      </div>
    </li>
  )
}

export default PlaylistItems
