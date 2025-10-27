import React from 'react'

const AppContext = React.createContext({
  isDarkTheme: true,
  toggleDarkTheme: () => {},
  likedVideos: [],
  toggleIsLike: () => {},
  dislikedVideos: [],
  toggleDisLike: () => {},
  isSaved: false,
  toggleSave: () => {},
  savedVideos: [],
  togglesaveVideos: () => {},
})

export default AppContext
