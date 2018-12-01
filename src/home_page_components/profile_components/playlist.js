import React from 'react'

const Playlist = (props) => {

  return (
    <li className='list-group-item'>
      <div  className="left">
        props.playlistObj.name
      </div>
    </li>
  )
}

export default Playlist
