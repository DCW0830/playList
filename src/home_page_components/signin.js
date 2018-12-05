import React, { Component, Fragment } from 'react'
import API_URL from '../Constants/backend_url.js'

import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

export default class SignIn extends Component {
  state = {
    username: "",
    pw: "",
    pwConfirmation: "",
    returningUser: true
  }

  toggleNewUser = () => this.setState({returningUser: !this.state.returningUser})

  handleSubmit = (event) => {
    event.preventDefault()
    let body = this.state.returningUser ? {user: {name: this.state.username, password: this.state.pw} } : {user: {name: this.state.username, password: this.state.pw, password_confirmation: this.state.pwConfirmation} }

    fetch(API_URL.users,
      {method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)})
    .then(res => res.json())
    .then(res => {
      if (res.status === 500) {res.errors.forEach(error => window.alert(error))}
      else {this.props.setUser(res.user,res.user.id, res.user.user_playlists)}})
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value}, () => console.log(this.state.username, this.state.pw, this.state.pwConfirmation))
  }

  render () {
    return (
        <div>

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
                 <CardHeader title="Sign In" style={{ textAlign: 'center' }}/>
                 <Paper style={{minHeight : 325, maxHeight : 325, overflow: 'auto'}}>
                   <form onSubmit={this.handleSubmit}>
                     <Grid
                       container
                       direction="column"
                       alignItems="center"
                       justify="center"
                       style={{minWidth:"50vh"},{minHeight:"30vh"}}
                       spacing={16}
                       >
                        <Grid item sm={10}>
                            <TextField label="Name" variant="outlined" type="text" value={this.state.username} onChange={this.handleChange} name="username"/>
                        </Grid>
                        <Grid item sm={10}>
                          <TextField label="Password"variant="outlined" type="Password" value={this.state.pw} onChange={this.handleChange} name="pw"/>
                        </Grid>
                        {!this.state.returningUser ?
                          <Grid item sm={10}>
                            <TextField label="Retype Password" variant="outlined" type="Password" value={this.state.pwConfirmation} onChange={this.handleChange} name="pwConfirmation"/>
                          </Grid>
                         : null}
                         <Grid item sm={10}>
                           <Input type="submit"> </Input>
                         </Grid>
                     </Grid>
                   </form>
                   {this.state.returningUser ? <Button color="secondary" onClick={this.toggleNewUser}>New User?</Button> : null}
                 </Paper>
              </Card>
            </Grid>
          </Grid>
        </div>
    )
  }
}
