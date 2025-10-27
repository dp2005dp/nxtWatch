import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Gaming from './components/Gaming'
import Trending from './components/Trending'

import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import ProductRoute from './components/ProductRoute'
import NotFound from './components/NotFound'
import AppContext from './context/AppContext'
import './App.css'


class App extends Component {
  state = {
    isTheme: true,
    likedVideos: [],
    dislikedVideos: [],
    savedVideos: [],
  }

  toggleDarkTheme = () => {
    this.setState(prevState => ({isTheme: !prevState.isTheme}))
  }

  toggleIsLike = videoId => {
    this.setState(prevState => {
      const isAlreadyLiked = prevState.likedVideos.includes(videoId)

      return {
        likedVideos: isAlreadyLiked
          ? prevState.likedVideos.filter(id => id !== videoId)
          : [...prevState.likedVideos, videoId],
        dislikedVideos: prevState.dislikedVideos.filter(id => id !== videoId),
      }
    })
  }

  toggleDisLike = videoId => {
    this.setState(prevState => {
      const isAlreadyDisliked = prevState.dislikedVideos.includes(videoId)
      return {
        dislikedVideos: isAlreadyDisliked
          ? prevState.dislikedVideos.filter(id => id !== videoId)
          : [...prevState.dislikedVideos, videoId],
        likedVideos: prevState.likedVideos.filter(id => id !== videoId), //
      }
    })
  }

  toggleSave = videoDetails => {
    this.setState(prevState => {
      const isAlreadyLiked = prevState.savedVideos.some(
        eachItem => eachItem.id === videoDetails.id,
      )
      console.log(isAlreadyLiked)
      const updatedSavedVideos = isAlreadyLiked
        ? prevState.savedVideos.filter(
            eachItem => eachItem.id !== videoDetails.id,
          )
        : [...prevState.savedVideos, videoDetails]

      return {
        savedVideos: updatedSavedVideos,
      }
    })
  }

  render() {
    const {isTheme, likedVideos, dislikedVideos, savedVideos} = this.state
    console.log(savedVideos)
    return (
      <AppContext.Provider
        value={{
          isDarkTheme: isTheme,
          toggleDarkTheme: this.toggleDarkTheme,
          likedVideos,
          toggleIsLike: this.toggleIsLike,
          dislikedVideos,
          toggleDisLike: this.toggleDisLike,
          toggleSave: this.toggleSave,
          savedVideos,
          togglesaveVideos: this.togglesaveVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProductRoute exact path="/" component={Home} />
          <ProductRoute exact path="/gaming" component={Gaming} />
          <ProductRoute exact path="/trending" component={Trending} />
          <ProductRoute exact path="/videos/:id" component={VideoItemDetails} />
          <ProductRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </AppContext.Provider>
    )
  }
}

export default App