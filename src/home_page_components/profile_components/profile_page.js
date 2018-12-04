import React, { Component } from 'react';
import EditNewPage from './edit_playlist_components/edit_new_page'
import UsersPlLIst from './user_pl_list'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import API_URL from '../../Constants/backend_url.js'



class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editNewPage: false,
      thePlaylists: []
    }
  }

  toggle = () => {
    this.setState({editNewPage: !this.state.editNewPage})
  }

  getCreatedPlaylist = (playlist) => {
    this.setState({
      thePlaylists: [...this.state.thePlaylists, playlist]
    })
  }

  renderPlaylists = (playlists) => {
    return(
      playlists.map(playlist =>{
        return(
        <Card key={`pl_${playlist.id}`}>
          <CardHeader id={playlist.id} title={playlist.title} style={{ textAlign: 'center' }} onClick={ this.props.onClickPlaylist}/>
        </Card>)
      })
    )
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        style={{minWidth:"100vh"},{minHeight:"100vh"}}
        spacing={16}
        >

        <Grid item  sm={4}>
          <Card>
             <CardHeader title="Playlists" style={{ textAlign: 'center' }}/>
             <Button onClick={() => this.props.generateBlankPlaylist()}>Create New Playlist</Button>
             <Paper style={{height:325}}>
               {this.props.user.user_playlists == [] ? "No Playlists Created" : this.renderPlaylists(this.props.playlists)}
             </Paper>
          </Card>
        </Grid>
        <Grid item  xs={6}>
          <Card >
             <CardHeader title="Party Time" style={{ textAlign: 'center' }}/>
             <Paper style={{height:350}}/>
          </Card>
        </Grid>
        <Grid item  xs={2}>
          <Card>
             <CardHeader title="Stats" style={{ textAlign: 'center' }}/>
             <Paper style={{height:350}}>
               <Typography variant="body1" component="p" style={{textAlign:'center'}}>
                 Hello {this.props.user.name}
               </Typography>
               <Typography variant="body2" component="p" style={{textAlign:'center'}}>
                 Likes: {this.props.user.total_likes}
               </Typography>
             </Paper>
          </Card>
        </Grid>



      </Grid>

    )
  }
}
export default ProfilePage
