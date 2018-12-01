import React from 'react'
import Playlist from './playlist';

const UsersPlLIst = (props) => {

  const playlist = props.thePlaylists.map( playlistObj =>  {
    return (
      <Playlist
        playlistObj={playlistObj}
        key={playlistObj.name}
      />
    )
  });

  return (
    <ul className= "col-md-4 list-group">
      {playlist}
    </ul>
  );
};

export default UsersPlLIst;
