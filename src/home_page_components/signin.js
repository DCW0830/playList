import React, { Component, Fragment } from 'react'

export default class SignIn extends Component {
  state = {
    username: "",
    pw: "",
    pwConfirmation: "",
    returningUser: false
  }

  toggleNewUser = () => this.setState({returningUser: !this.state.returningUser})

  handleSubmit = (event) => {
    event.preventDefault()
    let body = this.state.returningUser ? {user: {username: this.state.username, pw: this.state.pw} }: {user: {username: this.state.username, password: this.state.pw, password_confirmation: this.state.pwConfirmation} }
    fetch(`http://localhost:3000/api/v1/users/create`,
      {method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body)})
    .then(res => res.json())
    .then(user => this.props.setUser(user.id))

  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value}, () => console.log(this.state.username, this.state.pw, this.state.pwConfirmation))
  }

  render () {
    return (
        <div>
          <form className='ui form' onSubmit={this.handleSubmit}>
            <div className="field">
              <label>Username</label>
              <input type="text" value={this.state.username} onChange={this.handleChange} name="username"/>
            </div>

            <label>Password</label>
            <input type="Password"
              value={this.state.pw}
              onChange={this.handleChange}
              name="pw"
            />
            {this.state.returningUser ? <><label>Password Confirmation</label>

            <input type="Password"
              value={this.state.pwConfirmation} onChange={this.handleChange}
              name="pwConfirmation"/></> : null}
            <input type="submit" value="Sign In!"></input>
          </form>

          {!this.state.returningUser ? <button onClick={this.toggleNewUser}>New User?</button> : null}
        </div>
    )
  }
}
