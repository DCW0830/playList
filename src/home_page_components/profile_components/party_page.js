import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import API_URL from '../../Constants/backend_url.js'

class PartyPage extends Component {

  constructor(props){
    super(props)
    debugger
  }

  render(){
      return (
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          style={{minWidth:"100vh"},{minHeight:"100vh"}}
          spacing={16}
          >

          <Grid item  sm={5}>
            <Card>
               <CardHeader title="Upcoming Songs" style={{ textAlign: 'center' }}/>
               <Paper style={{minHeight : 350, maxHeight : 350, overflow: 'auto'}}>
               </Paper>
            </Card>
          </Grid>
          <Grid item  xs={5}>
            <Card >
               <CardHeader title="Now Playing" style={{ textAlign: 'center' }}/>
               <Paper style={{height:350}}>
               </Paper>
            </Card>
          </Grid>
          <Grid item  xs={2}>
            <Card>
               <CardHeader title="Viewers" style={{ textAlign: 'center' }}/>
               <Paper style={{height:350}}>
                 <Typography variant="body1" component="p" style={{textAlign:'center'}}>
                  bobbi joe
                 </Typography>
               </Paper>
            </Card>
          </Grid>
        </Grid>
      )
  }
}

export default PartyPage
