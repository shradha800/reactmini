import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    this.setState({isError: false})
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, isError: true})
  }

  onLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isError, errorMsg} = this.state

    return (
      <div className="login-container">
        <div>
          <img
            src="https://res.cloudinary.com/dwdaqrmdg/image/upload/v1700756717/Ellipse_99_aklp7g.png"
            alt="website login"
            className="login-page-img"
          />
          <img
            src="https://res.cloudinary.com/dwdaqrmdg/image/upload/v1700834029/login_img_bpfetj.png"
            alt="website login"
            className="login-page-large-img"
          />
        </div>
        <form className="form-container" onSubmit={this.onLogin}>
          <img
            src="https://res.cloudinary.com/dwdaqrmdg/image/upload/v1700817845/Book_hub_logo_ocuksg.png"
            alt="login website logo"
            className="book-hub-logo"
          />
          <label htmlFor="username" className="label-element">
            Username*
          </label>
          <input
            type="text"
            id="username"
            className="input-element"
            placeholder="Username"
            value={username}
            onChange={this.onChangeUsername}
          />
          <label htmlFor="password" className="label-element">
            Password*
          </label>
          <input
            type="password"
            id="password"
            className="input-element"
            placeholder="Password"
            value={password}
            onChange={this.onChangePassword}
          />
          {isError && <p className="error-msg"> {errorMsg} </p>}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
