import React from 'react'

const PlaylistItems = ({videoObj, handleDelete}) => {
  const imageUrl = videoObj.snippet.thumbnails.default.url

  return (
    <li className='list-group-item'>
      <div  className="media-right">
        <img className="media-object" alt={videoObj.snippet.title} src={imageUrl} />
        <button onClick={()=>handleDelete(videoObj.etag)}>Remove</button>
      </div>

      <div className="media-body">
        <div className="media-heading">{videoObj.snippet.title}</div>
      </div>
    </li>
  )
}

export default PlaylistItems
