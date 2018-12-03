import React, { Component, Fragment } from 'react'

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
    let body = this.state.returningUser ? {user: {name: this.state.username, pw: this.state.pw} } : {user: {name: this.state.username, password: this.state.pw, password_confirmation: this.state.pwConfirmation} }
    debugger
    fetch(`http://localhost:3000/api/v1/users`,
      {method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)})
    .then(res => res.json())
    .then(res => {
      if (res.status === 500) {res.errors.forEach(error => window.alert(error))}
      else {
        debugger
        this.props.setUser(res.user.id, res.playlists)}
    })
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value}, () => console.log(this.state.username, this.state.pw, this.state.pwConfirmation))
  }

  render () {
    return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Username</label>
            <input type="text" value={this.state.username} onChange={this.handleChange} name="username"/>
            <label>Password</label>
            <input type="Password" value={this.state.pw} onChange={this.handleChange} name="pw"/>
            {!this.state.returningUser ? <><label>Password Confirmation</label>
            <input type="Password" value={this.state.pwConfirmation} onChange={this.handleChange} name="pwConfirmation"/></> : null}
            <input type="submit" value="Sign In!"></input>
          </form>
          {this.state.returningUser ? <button onClick={this.toggleNewUser}>New User?</button> : null}
        </div>
    )
  }
}
