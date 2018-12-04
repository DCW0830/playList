import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"



class ProfilePartyCard extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <Button style={{background:"#ff4d4d"},{width:"50%"},{textAlign:"center"}}>
        Party!
      </Button>
    )
  }
}

export default ProfilePartyCard
