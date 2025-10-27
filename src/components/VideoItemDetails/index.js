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
import {AiOutlineLike} from 'react-icons/ai'
import {BiDislike} from 'react-icons/bi'
import {
  VideoItemResponsiveMainContainer,
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
  VideoItemResponsiveContainer,
  VideosDeatailsContainer,
  VideoItemProfileImage,
  VideosViewsItemContainer,
  VideoItemTitle,
  VideoItemDetailss,
  Hr,
  VideosDescripition,
  LikesFlexContainer,
  LikesContent,
  LikeButton,
  LikeResposiveContainer,
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
  VideoPlayer,
} from './styledComponents'
import AppContext from '../../context/AppContext'

const renderStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  intial: 'INTIAL',
  loader: 'LOADER',
}

class VideoItemDetails extends Component {
  state = {
    videositemData: [],
    activeTab: 'Home',
    stateStatus: renderStatus.intial,
    bannerStatus: true,
  }

  componentDidMount() {
    this.videosItemApi()
  }

  closeBanner = () => {
    this.setState({bannerStatus: false})
  }

  onAvtiveTab = tabId => {
    this.setState({activeTab: tabId})
  }

  videosItemApi = async () => {
    this.setState({stateStatus: renderStatus.loader})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const getToken = Cookies.get('jwt_token')
    const videosApiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }

    const response = await fetch(videosApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const destructureData = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }

      this.setState({
        videositemData: destructureData,
        stateStatus: renderStatus.success,
      })
    } else {
      this.setState({stateStatus: renderStatus.failure})
    }
  }

  render() {
    const {videositemData, activeTab, stateStatus, bannerStatus} = this.state
    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      channel = {},
      description,
    } = videositemData
    console.log(videoUrl)
    const {name, profileImageUrl, subscriberCount} = channel
    const publishedDate = publishedAt
      ? formatDistanceToNow(new Date(publishedAt))
      : ''

    return (
      <AppContext.Consumer>
        {value => {
          const {
            isDarkTheme,
            toggleDarkTheme,
            toggleIsLike,
            toggleDisLike,
            savedVideos,
            toggleSave,
            likedVideos,
            dislikedVideos,
          } = value
          const isThemeLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          const onChangeTheme = () => {
            toggleDarkTheme()
          }

          const isAlreadySaved = savedVideos.some(
            each => each.id === videositemData.id,
          )

          const saveColor = isAlreadySaved ? '#2563eb' : '#64748b'
          const saveText = isAlreadySaved ? 'Saved' : 'Save'

          const isAlreadyLiked = likedVideos.some(each =>
            each.includes(videositemData.id),
          )

          const like = isAlreadyLiked ? '#2563eb ' : '#64748b'

          const isDisLiked = dislikedVideos.some(each =>
            each.includes(videositemData.id),
          )

          const disLike = isDisLiked ? '#2563eb' : '#64748b'

          const likeButton = () => {
            toggleIsLike(videositemData.id)
          }
          const disLikeButton = () => {
            toggleDisLike(videositemData.id)
          }
          const saveButton = () => {
            toggleSave({...videositemData})
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

          const videoItemdetailsView = () => (
            <div>
              <VideoPlayer
                url={videoUrl}
                controls
                config={{
                  youtube: {
                    playerVars: {modestbranding: 1, rel: 0 ,  origin: window.location.origin,},
                  },
                }}
              />

              <VideoItemTitle isTheme={isDarkTheme}>{title}</VideoItemTitle>

              <LikesFlexContainer>
                <VideosViewsItemContainer>
                  <VideoItemDetailss isTheme={isDarkTheme} fontSize="18px">
                    {`${viewCount} views`}
                  </VideoItemDetailss>
                  <VideoItemDetailss
                    isTheme={isDarkTheme}
                    fontSize="18px"
                  >{`. ${publishedDate}`}</VideoItemDetailss>
                </VideosViewsItemContainer>

                <LikeResposiveContainer>
                  <LikeButton>
                    <AiOutlineLike color={like} size={20} />
                    <LikesContent
                      activeLike={isAlreadyLiked}
                      type="button"
                      onClick={likeButton}
                    >
                      Like
                    </LikesContent>
                  </LikeButton>

                  <LikeButton>
                    <BiDislike color={disLike} size={20} />
                    <LikesContent
                      activeLike={isDisLiked}
                      type="button"
                      onClick={disLikeButton}
                    >
                      Dislike
                    </LikesContent>
                  </LikeButton>

                  <LikeButton>
                    <RiMenuUnfoldFill color={saveColor} size={20} />
                    <LikesContent
                      activeLike={isAlreadySaved}
                      type="button"
                      onClick={saveButton}
                    >
                      {saveText}
                    </LikesContent>
                  </LikeButton>
                </LikeResposiveContainer>
              </LikesFlexContainer>
              <Hr />

              <VideosDeatailsContainer>
                <VideoItemProfileImage
                  src={profileImageUrl}
                  alt="channel logo"
                />
                <div>
                  <VideoItemTitle isTheme={isDarkTheme}>{name}</VideoItemTitle>
                  <VideoItemDetailss
                    isTheme={isDarkTheme}
                    fontSize="15px"
                  >{`${subscriberCount} subscribers`}</VideoItemDetailss>
                </div>
              </VideosDeatailsContainer>
              <VideosDescripition isTheme={isDarkTheme}>
                {description}
              </VideosDescripition>
            </div>
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
                  <FailureButton type="button" onClick={this.videosItemApi}>
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
                return videoItemdetailsView()
              case renderStatus.failure:
                return failureView()
              default:
                return null
            }
          }

          return (
            <VideoItemResponsiveMainContainer
              isTheme={isDarkTheme}
              data-testid="videoItemDetails"
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

                <VideoItemResponsiveContainer isTheme={isDarkTheme}>
                  {bannerStatus && bannerView()}
                  {renderUiview()}
                </VideoItemResponsiveContainer>
              </HomeFlexContainer>
            </VideoItemResponsiveMainContainer>
          )
        }}
      </AppContext.Consumer>
    )
  }
}

export default VideoItemDetails