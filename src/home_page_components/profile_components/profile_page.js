import React, { Component } from 'react';
import EditNewPage from './edit_playlist_components/edit_new_page'
import UsersPlLIst from './user_pl_list'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"



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
        <Button onClick={() => this.props.updatePageIndex(2)}>Create New Playlist</Button>
          <Card>
             <CardHeader title="Playlists Card"/>
             {this.props.playlists[0] ? this.props.playlists.map(pl => <p>{pl.title}</p>) : <p>No playlists yet....</p>}
             <Paper style={{height:350}}/>
          </Card>
        </Grid>
        <Grid item  xs={6}>
          <Card >
             <CardHeader title="Main Card" style={{ textAlign: 'center' }}/>
             <Paper style={{height:350}}/>
          </Card>
        </Grid>
        <Grid item  xs={2}>
          <Card>
             <CardHeader title="Stats"/>
             <Paper style={{height:350}}/>
          </Card>
        </Grid>



      </Grid>

    )
  }
}
export default ProfilePage
