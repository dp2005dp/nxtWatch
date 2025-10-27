import {Component} from 'react'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import {RiMenuUnfoldFill} from 'react-icons/ri'
import {MdHome} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {IoMdLogOut, IoMdClose} from 'react-icons/io'
import {SiYoutubegaming} from 'react-icons/si'
import {
  TrendingResponsiveContainer,
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
  TrendingContainer,
  TrendingFlexContainer,
  TrendingIconContainer,
  TrendingContent,
  TredingVideosMainContainer,
  TredingVideosListContainer,
  TredingVideosImage,
  TredingVideosViewsContainer,
  TredingVideoTitle,
  TredingVideoTDetails,
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

class Trending extends Component {
  state = {
    trendingVideosData: [],
    activeTab: 'Trending',
    stateStatus: renderStatus.intial,
    bannerStatus: true,
  }

  componentDidMount() {
    this.tredingVideosApi()
  }

  closeBanner = () => {
    this.setState({bannerStatus: false})
  }

  onAvtiveTab = tabId => {
    this.setState({activeTab: tabId})
  }

  tredingVideosApi = async () => {
    this.setState({stateStatus: renderStatus.loader})
    const getToken = Cookies.get('jwt_token')
    const videosApiUrl = `https://apis.ccbp.in/videos/trending`
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
        channel: {
          name: eachItem.channel.name,
          profileImageUrl: eachItem.channel.profile_image_url,
        },
        viewCount: eachItem.view_count,
        publishedAt: eachItem.published_at,
      }))

      this.setState({
        trendingVideosData: destructureData,
        stateStatus: renderStatus.success,
      })
    } else {
      this.setState({stateStatus: renderStatus.failure})
    }
  }

  render() {
    const {trendingVideosData, activeTab, stateStatus, bannerStatus} =
      this.state

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

          const trendingVideosView = () => (
            <TredingVideosMainContainer>
              {trendingVideosData.map(eachItem => {
                const publishedDate = formatDistanceToNow(
                  new Date(eachItem.publishedAt),
                )

                return (
                  <Links to={`/videos/${eachItem.id}`}>
                    <TredingVideosListContainer key={eachItem.id}>
                      <TredingVideosImage
                        src={eachItem.thumbnailUrl}
                        alt="video thumbnail"
                      />
                      <div>
                        <TredingVideoTitle isTheme={isDarkTheme}>
                          {eachItem.title}
                        </TredingVideoTitle>
                        <TredingVideoTDetails isTheme={isDarkTheme}>
                          {eachItem.channel.name}
                        </TredingVideoTDetails>
                        <TredingVideosViewsContainer>
                          <TredingVideoTDetails isTheme={isDarkTheme}>
                            {eachItem.viewCount}
                          </TredingVideoTDetails>
                          <TredingVideoTDetails
                            isTheme={isDarkTheme}
                          >{`. ${publishedDate}`}</TredingVideoTDetails>
                        </TredingVideosViewsContainer>
                      </div>
                    </TredingVideosListContainer>
                  </Links>
                )
              })}
            </TredingVideosMainContainer>
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
                  <FailureButton type="button" onClick={this.tredingVideosApi}>
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
                return trendingVideosView()
              case renderStatus.failure:
                return failureView()
              default:
                return null
            }
          }

          return (
            <TrendingResponsiveContainer
              isTheme={isDarkTheme}
              data-testid="trending"
            >
              <NavContainer isTheme={isDarkTheme}>
                <HomeLogo src={isThemeLogo} alt="website logo" />
                <LogoutContainer>
                  <ThemButton
                    type="button"
                    onClick={onChangeTheme}
                    data-testid="theme"
                  >
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
                      <FeaturesListContainer>
                        <Links to="/">
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
                        </Links>
                      </FeaturesListContainer>

                      <FeaturesListContainer>
                        <Links to="/trending">
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
                        </Links>
                      </FeaturesListContainer>

                      <FeaturesListContainer>
                        <Links to="/gaming">
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
                        </Links>
                      </FeaturesListContainer>

                      <FeaturesListContainer>
                        <Links to="/saved-videos">
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
                        </Links>
                      </FeaturesListContainer>
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
                  <TrendingContainer isTheme={isDarkTheme}>
                    <TrendingFlexContainer>
                      <TrendingIconContainer isTheme={isDarkTheme}>
                        <FaFire color="#ff0000" size={20} />
                      </TrendingIconContainer>
                      <TrendingContent isTheme={isDarkTheme}>
                        Trending
                      </TrendingContent>
                    </TrendingFlexContainer>
                  </TrendingContainer>
                  {renderUiview()}
                </VideoResponsiveContainer>
              </HomeFlexContainer>
            </TrendingResponsiveContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default Trending