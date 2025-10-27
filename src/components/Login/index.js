import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import AppContext from '../../context/AppContext'
import {
  LoginContainer,
  LoginCardContainer,
  Logo,
  Label,
  Input,
  Checkbox,
  LoginButton,
  Margin,
  LoginFailedMessage,
} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    loginFailedMessage: '',
    login: false,
    showPassword: false,
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onUserName = e => {
    this.setState({username: e.target.value})
  }

  onPassword = e => {
    this.setState({password: e.target.value})
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken.jwt_token, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onLogin = async e => {
    e.preventDefault()

    const {username, password} = this.state

    const userDeatails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDeatails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.loginSuccess(data)
      this.setState({login: false})
    } else {
      this.setState({loginFailedMessage: data.error_msg, login: true})
    }
  }

  render() {
    const {loginFailedMessage, login, showPassword} = this.state
    console.log(showPassword)
    const getToken = Cookies.get('jwt_token')
    if (getToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const isThemeLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          return (
            <LoginContainer isTheme={isDarkTheme}>
              <LoginCardContainer isTheme={isDarkTheme}>
                <Logo src={isThemeLogo} alt="website logo" />
                <form onSubmit={this.onLogin}>
                  <Margin>
                    <Label isTheme={isDarkTheme} htmlFor="name">
                      USERNAME
                    </Label>
                    <br />
                    <Input
                      type="text"
                      placeholder="Username"
                      isTheme={isDarkTheme}
                      id="name"
                      onChange={this.onUserName}
                    />
                  </Margin>

                  <Margin>
                    <Label isTheme={isDarkTheme} htmlFor="password">
                      PASSWORD
                    </Label>
                    <br />
                    <Input
                      type={showPassword ? 'type' : 'password'}
                      placeholder="Password"
                      isTheme={isDarkTheme}
                      id="password"
                      onChange={this.onPassword}
                    />
                  </Margin>
                  <div>
                    <Checkbox
                      type="checkbox"
                      isTheme={isDarkTheme}
                      id="checkbox"
                      onClick={this.onShowPassword}
                    />
                    <Label isTheme={isDarkTheme} htmlFor="checkbox">
                      Show Password
                    </Label>
                  </div>

                  <LoginButton type="submit">Login</LoginButton>
                  {login && (
                    <LoginFailedMessage>
                      {loginFailedMessage}
                    </LoginFailedMessage>
                  )}
                </form>
              </LoginCardContainer>
            </LoginContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Login
