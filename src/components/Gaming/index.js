import {Component} from 'react'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {ThreeDots} from 'react-loader-spinner'
import {RiMenuUnfoldFill} from 'react-icons/ri'
import {MdHome} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {IoMdLogOut, IoMdClose} from 'react-icons/io'
import {SiYoutubegaming} from 'react-icons/si'
import {
  GamingRespinsiveContainer,
  NavContainer,
  HomeLogo,
  LogoutContainer,
  ThemButton,
  Profile,
  LogoutButton,
  HomeFlexContainer,
  SideBarContainer,
  FeaturesMainContainer,
  FeaturesListContainer,
  FeaturesButtonContainer,
  FeaturesContent,
  ContactContent,
  ContactIconsContainer,
  ContactIcons,
  VideoResponsiveContainer,
  GamingContainer,
  GamingFlexContainer,
  GamingIconContainer,
  GamingContent,
  GamingVideosMainContainer,
  GamingVideosListContainer,
  GamingVideosImage,
  GamingVideoTitle,
  GamingVideoTDetails,
  Links,
  PopupConatiner,
  PopupContent,
  CancelButton,
  ConfirmButton,
  LogoutFlexContainer,
  UiResponsiveContainer,
  FailureContainer,
  FailureImage,
  FailureMessage,
  FailureDescripition,
  FailureButton,
  BannerContainer,
  BannerCloseContainer,
  BannerLogo,
  BannerContent,
  BannerButton,
  MobileLogoutButton,
  MoonLogo,
  SunLogo,
  MenuLogo,
  MenuCloseContainer,
  MobileFeaturesPopContainer,
} from './styledComponents'
import AppContext from '../../context/AppContext'

const renderStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  intial: 'INTIAL',
  loader: 'LOADER',
}

class Gaming extends Component {
  state = {
    gamingVideosData: [],
    activeTab: 'Gaming',
    stateStatus: renderStatus.intial,
    bannerStatus: true,
  }

  componentDidMount() {
    this.gamingVideosApi()
  }

  closeBanner = () => {
    this.setState({bannerStatus: false})
  }

  onAvtiveTab = tabId => {
    this.setState({activeTab: tabId})
  }

  gamingVideosApi = async () => {
    this.setState({stateStatus: renderStatus.loader})
    const getToken = Cookies.get('jwt_token')
    const videosApiUrl = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }

    const response = await fetch(videosApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const destructureData = data.videos.map(eachItem => ({
        id: eachItem.id,
        title: eachItem.title,
        thumbnailUrl: eachItem.thumbnail_url,
        viewCount: eachItem.view_count,
      }))

      this.setState({
        gamingVideosData: destructureData,
        stateStatus: renderStatus.success,
      })
    } else {
      this.setState({stateStatus: renderStatus.failure})
    }
  }

  render() {
    const {gamingVideosData, activeTab, stateStatus, bannerStatus} = this.state
    return (
      <AppContext.Consumer>
        {value => {
          const {isDarkTheme, toggleDarkTheme} = value
          const isThemeLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          const onChangeTheme = () => {
            toggleDarkTheme()
          }
          const logoutButton = () => {
            const {history} = this.props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          const bannerView = () => (
            <BannerContainer data-testid="banner">
              <BannerCloseContainer
                onClick={this.closeBanner}
                data-testid="close"
              >
                <IoMdClose color="#000000" size={30} />
              </BannerCloseContainer>
              <BannerLogo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
              />
              <BannerContent isTheme={isDarkTheme}>
                Buy Nxt Watch Premium prepaid plans with <br /> UPI
              </BannerContent>

              <BannerButton type="button">GET IT NOW</BannerButton>
            </BannerContainer>
          )

          const gamingvideosView = () => (
            <GamingVideosMainContainer>
              {gamingVideosData.map(eachItem => (
                <Links to={`/videos/${eachItem.id}`}>
                  <GamingVideosListContainer key={eachItem.id}>
                    <GamingVideosImage
                      src={eachItem.thumbnailUrl}
                      alt="video thumbnail"
                    />

                    <GamingVideoTitle isTheme={isDarkTheme}>
                      {eachItem.title}
                    </GamingVideoTitle>
                    <GamingVideoTDetails isTheme={isDarkTheme}>
                      {`${eachItem.viewCount} Watching Worldwide`}
                    </GamingVideoTDetails>
                  </GamingVideosListContainer>
                </Links>
              ))}
            </GamingVideosMainContainer>
          )

          const failureView = () => {
            const failureImage = isDarkTheme
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

            return (
              <UiResponsiveContainer>
                <FailureContainer>
                  <FailureImage src={failureImage} alt="failure view" />
                  <FailureMessage isTheme={isDarkTheme}>
                    Oops! Something Went Wrong
                  </FailureMessage>
                  <FailureDescripition isTheme={isDarkTheme}>
                    We are having some trouble completing your request.
                    <br />
                    Please try again.
                  </FailureDescripition>
                  <FailureButton type="button" onClick={this.gamingVideosApi}>
                    Retry
                  </FailureButton>
                </FailureContainer>
              </UiResponsiveContainer>
            )
          }

          const loaderView = () => (
            <UiResponsiveContainer>
              <div className="loader-container" data-testid="loader">
                <ThreeDots
                  type="ThreeDots"
                  color={isDarkTheme ? '#000000' : '#ffffff'}
                  height="100"
                  width="100"
                />
              </div>
            </UiResponsiveContainer>
          )

          const renderUiview = () => {
            switch (stateStatus) {
              case renderStatus.loader:
                return loaderView()
              case renderStatus.success:
                return gamingvideosView()
              case renderStatus.failure:
                return failureView()
              default:
                return null
            }
          }

          return (
            <GamingRespinsiveContainer
              isTheme={isDarkTheme}
              data-testid="gaming"
            >
              <NavContainer isTheme={isDarkTheme}>
                <HomeLogo src={isThemeLogo} alt="website logo" />
                <LogoutContainer>
                  <ThemButton type="button" onClick={onChangeTheme}>
                    {isDarkTheme ? (
                      <MoonLogo isTheme={isDarkTheme} />
                    ) : (
                      <SunLogo isTheme={isDarkTheme} />
                    )}
                  </ThemButton>

                  <Profile
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                  />

                  <Popup modal trigger={<MenuLogo isTheme={isDarkTheme} />}>
                    {cansel => (
                      <MobileFeaturesPopContainer isTheme={isDarkTheme}>
                        <MenuCloseContainer>
                          <IoMdClose
                            color={isDarkTheme ? '#000000' : '#ffffff'}
                            size={30}
                            onClick={() => cansel()}
                          />
                        </MenuCloseContainer>
                        <FeaturesMainContainer>
                          <Links to="/">
                            <FeaturesListContainer>
                              <FeaturesButtonContainer
                                isTheme={isDarkTheme}
                                isActiveTab={activeTab === 'Home'}
                                onClick={() => this.onAvtiveTab('Home')}
                              >
                                <MdHome
                                  color={
                                    activeTab === 'Home'
                                      ? '#ff0000'
                                      : ' #616e7c'
                                  }
                                  size={20}
                                />
                                <FeaturesContent
                                  isTheme={isDarkTheme}
                                  isActiveTab={activeTab === 'Home'}
                                >
                                  Home
                                </FeaturesContent>
                              </FeaturesButtonContainer>
                            </FeaturesListContainer>
                          </Links>
                          <Links to="/trending">
                            <FeaturesListContainer>
                              <FeaturesButtonContainer
                                isTheme={isDarkTheme}
                                isActiveTab={activeTab === 'Trending'}
                                onClick={() => this.onAvtiveTab('Trending')}
                              >
                                <FaFire
                                  color={
                                    activeTab === 'Trending'
                                      ? '#ff0000'
                                      : ' #616e7c'
                                  }
                                  size={20}
                                />
                                <FeaturesContent
                                  isTheme={isDarkTheme}
                                  isActiveTab={activeTab === 'Trending'}
                                >
                                  Trending
                                </FeaturesContent>
                              </FeaturesButtonContainer>
                            </FeaturesListContainer>
                          </Links>

                          <Links to="/gaming">
                            <FeaturesListContainer>
                              <FeaturesButtonContainer
                                isTheme={isDarkTheme}
                                isActiveTab={activeTab === 'Gaming'}
                                onClick={() => this.onAvtiveTab('Gaming')}
                              >
                                <SiYoutubegaming
                                  color={
                                    activeTab === 'Gaming'
                                      ? '#ff0000'
                                      : ' #616e7c'
                                  }
                                  size={20}
                                />
                                <FeaturesContent
                                  isTheme={isDarkTheme}
                                  isActiveTab={activeTab === 'Gaming'}
                                >
                                  Gaming
                                </FeaturesContent>
                              </FeaturesButtonContainer>
                            </FeaturesListContainer>
                          </Links>
                          <Links to="/saved-videos">
                            <FeaturesListContainer>
                              <FeaturesButtonContainer
                                isTheme={isDarkTheme}
                                isActiveTab={activeTab === 'Saved Videos'}
                                onClick={() => this.onAvtiveTab('Saved Videos')}
                              >
                                <RiMenuUnfoldFill
                                  color={
                                    activeTab === 'Saved Videos'
                                      ? '#ff0000'
                                      : ' #616e7c'
                                  }
                                  size={20}
                                />
                                <FeaturesContent
                                  isTheme={isDarkTheme}
                                  isActiveTab={activeTab === 'Saved Videos'}
                                >
                                  Saved videos
                                </FeaturesContent>
                              </FeaturesButtonContainer>
                            </FeaturesListContainer>
                          </Links>
                        </FeaturesMainContainer>
                      </MobileFeaturesPopContainer>
                    )}
                  </Popup>

                  <Popup
                    modal
                    trigger={
                      <div>
                        <LogoutButton type="button" isTheme={isDarkTheme}>
                          Logout
                        </LogoutButton>

                        <MobileLogoutButton>
                          <IoMdLogOut
                            color={isDarkTheme ? '#000000' : '#ffffff'}
                            size={28}
                          />
                        </MobileLogoutButton>
                      </div>
                    }
                  >
                    {cancel => (
                      <PopupConatiner isTheme={isDarkTheme}>
                        <PopupContent isTheme={isDarkTheme}>
                          Are you sure, you want to logout?
                        </PopupContent>
                        <LogoutFlexContainer>
                          <CancelButton type="button" onClick={() => cancel()}>
                            Cancel
                          </CancelButton>
                          <ConfirmButton type="button" onClick={logoutButton}>
                            Confirm
                          </ConfirmButton>
                        </LogoutFlexContainer>
                      </PopupConatiner>
                    )}
                  </Popup>
                </LogoutContainer>
              </NavContainer>
              <HomeFlexContainer>
                <SideBarContainer isTheme={isDarkTheme}>
                  <div>
                    <FeaturesMainContainer>
                      <Links to="/">
                        <FeaturesListContainer>
                          <FeaturesButtonContainer
                            isTheme={isDarkTheme}
                            isActiveTab={activeTab === 'Home'}
                            onClick={() => this.onAvtiveTab('Home')}
                          >
                            <MdHome
                              color={
                                activeTab === 'Home' ? '#ff0000' : ' #616e7c'
                              }
                              size={20}
                            />
                            <FeaturesContent
                              isTheme={isDarkTheme}
                              isActiveTab={activeTab === 'Home'}
                            >
                              Home
                            </FeaturesContent>
                          </FeaturesButtonContainer>
                        </FeaturesListContainer>
                      </Links>
                      <Links to="/trending">
                        <FeaturesListContainer>
                          <FeaturesButtonContainer
                            isTheme={isDarkTheme}
                            isActiveTab={activeTab === 'Trending'}
                            onClick={() => this.onAvtiveTab('Trending')}
                          >
                            <FaFire
                              color={
                                activeTab === 'Trending'
                                  ? '#ff0000'
                                  : ' #616e7c'
                              }
                              size={20}
                            />
                            <FeaturesContent
                              isTheme={isDarkTheme}
                              isActiveTab={activeTab === 'Trending'}
                            >
                              Trending
                            </FeaturesContent>
                          </FeaturesButtonContainer>
                        </FeaturesListContainer>
                      </Links>

                      <Links to="/gaming">
                        <FeaturesListContainer>
                          <FeaturesButtonContainer
                            isTheme={isDarkTheme}
                            isActiveTab={activeTab === 'Gaming'}
                            onClick={() => this.onAvtiveTab('Gaming')}
                          >
                            <SiYoutubegaming
                              color={
                                activeTab === 'Gaming' ? '#ff0000' : ' #616e7c'
                              }
                              size={20}
                            />
                            <FeaturesContent
                              isTheme={isDarkTheme}
                              isActiveTab={activeTab === 'Gaming'}
                            >
                              Gaming
                            </FeaturesContent>
                          </FeaturesButtonContainer>
                        </FeaturesListContainer>
                      </Links>
                      <Links to="/saved-videos">
                        <FeaturesListContainer>
                          <FeaturesButtonContainer
                            isTheme={isDarkTheme}
                            isActiveTab={activeTab === 'Saved Videos'}
                            onClick={() => this.onAvtiveTab('Saved Videos')}
                          >
                            <RiMenuUnfoldFill
                              color={
                                activeTab === 'Saved Videos'
                                  ? '#ff0000'
                                  : ' #616e7c'
                              }
                              size={20}
                            />
                            <FeaturesContent
                              isTheme={isDarkTheme}
                              isActiveTab={activeTab === 'Saved Videos'}
                            >
                              Saved videos
                            </FeaturesContent>
                          </FeaturesButtonContainer>
                        </FeaturesListContainer>
                      </Links>
                    </FeaturesMainContainer>
                  </div>

                  <div>
                    <ContactContent isTheme={isDarkTheme}>
                      CONTACT US
                    </ContactContent>
                    <ContactIconsContainer>
                      <ContactIcons
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                        alt="facebook logo"
                      />
                      <ContactIcons
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                        alt="twitter logo"
                      />
                      <ContactIcons
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                        alt="linked in logo"
                      />
                    </ContactIconsContainer>
                    <ContactContent isTheme={isDarkTheme}>
                      Enjoy! Now you can see your recommendations!
                    </ContactContent>
                  </div>
                </SideBarContainer>

                <VideoResponsiveContainer isTheme={isDarkTheme}>
                  {bannerStatus && bannerView()}
                  <GamingContainer isTheme={isDarkTheme}>
                    <GamingFlexContainer>
                      <GamingIconContainer isTheme={isDarkTheme}>
                        <SiYoutubegaming color="#ff0000" size={20} />
                      </GamingIconContainer>
                      <GamingContent isTheme={isDarkTheme}>
                        Gaming
                      </GamingContent>
                    </GamingFlexContainer>
                  </GamingContainer>

                  {renderUiview()}
                </VideoResponsiveContainer>
              </HomeFlexContainer>
            </GamingRespinsiveContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Gaming