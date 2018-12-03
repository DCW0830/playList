import React, { Component } from 'react';
import EditNewPage from './edit_playlist_components/edit_new_page'
import UsersPlLIst from './user_pl_list'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";



class ProfilePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editNewPage: false,
      thePlaylists: []
    }
  }

  toggle = () => {
    let theSwitch = this.state.editNewPage
    theSwitch = !theSwitch
    this.setState({editNewPage: theSwitch})
  }

  getCreatedPlaylist = (playlist) => {
    this.setState({
      thePlaylists: [...this.state.thePlaylists, playlist]
    }, ()=> console.log(this.state.thePlaylists))
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
             <CardHeader title="Playlists Card"/>
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
