import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {RiMenuUnfoldFill} from 'react-icons/ri'
import {MdHome} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {IoMdClose, IoMdLogOut} from 'react-icons/io'
import {SiYoutubegaming} from 'react-icons/si'
import {
  HomeContainer,
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
  Links,
  PopupConatiner,
  PopupContent,
  CancelButton,
  ConfirmButton,
  LogoutFlexContainer,
  UiResponsiveContainer,
  FailureContainer,
  NotFoundFailureImage,
  FailureMessage,
  FailureDescripition,
  MobileLogoutButton,
  MoonLogo,
  SunLogo,
  MenuLogo,
  MenuCloseContainer,
  MobileFeaturesPopContainer,
} from './styledComponents'
import AppContext from '../../context/AppContext'

const NotFound = props => (
  <AppContext.Consumer>
    {value => {
      const {isDarkTheme, toggleDarkTheme, savedVideos} = value
      console.log(savedVideos)
      const isThemeLogo = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

      const onChangeTheme = () => {
        toggleDarkTheme()
      }
      const logoutButton = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }
      const notFoundVideosView = () => {
        const isRandomPathImage = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        return (
          <UiResponsiveContainer>
            <FailureContainer>
              <NotFoundFailureImage src={isRandomPathImage} alt="not found" />
              <FailureMessage isTheme={isDarkTheme}>
                Page Not Found
              </FailureMessage>
              <FailureDescripition isTheme={isDarkTheme}>
                we are sorry, the page you requested could not be found.
              </FailureDescripition>
            </FailureContainer>
          </UiResponsiveContainer>
        )
      }

      return (
        <HomeContainer isTheme={isDarkTheme}>
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
                  <MobileFeaturesPopContainer>
                    <MenuCloseContainer>
                      <IoMdClose
                        color={isDarkTheme ? '#000000' : '#ffffff'}
                        size={30}
                        onClick={() => cansel()}
                      />
                    </MenuCloseContainer>
                    <FeaturesMainContainer isTheme={isDarkTheme}>
                      <FeaturesListContainer>
                        <Links to="/">
                          <FeaturesButtonContainer>
                            <MdHome color="#616e7c" size={20} />
                            <FeaturesContent isTheme={isDarkTheme}>
                              Home
                            </FeaturesContent>
                          </FeaturesButtonContainer>
                        </Links>
                      </FeaturesListContainer>

                      <FeaturesListContainer>
                        <Links to="/trending">
                          <FeaturesButtonContainer>
                            <FaFire color="#616e7c" size={20} />
                            <FeaturesContent isTheme={isDarkTheme}>
                              Trending
                            </FeaturesContent>
                          </FeaturesButtonContainer>
                        </Links>
                      </FeaturesListContainer>

                      <FeaturesListContainer>
                        <Links to="/gaming">
                          <FeaturesButtonContainer>
                            <SiYoutubegaming color="#616e7c" size={20} />
                            <FeaturesContent isTheme={isDarkTheme}>
                              Gaming
                            </FeaturesContent>
                          </FeaturesButtonContainer>
                        </Links>
                      </FeaturesListContainer>

                      <FeaturesListContainer>
                        <Links to="/saved-videos">
                          <FeaturesButtonContainer>
                            <RiMenuUnfoldFill color="#616e7c" size={20} />
                            <FeaturesContent isTheme={isDarkTheme}>
                              Saved videos
                            </FeaturesContent>
                          </FeaturesButtonContainer>
                        </Links>
                      </FeaturesListContainer>
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
                      Are you sure,you want to logout?
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
                      <FeaturesButtonContainer>
                        <MdHome color="#616e7c" size={20} />
                        <FeaturesContent isTheme={isDarkTheme}>
                          Home
                        </FeaturesContent>
                      </FeaturesButtonContainer>
                    </Links>
                  </FeaturesListContainer>

                  <FeaturesListContainer>
                    <Links to="/trending">
                      <FeaturesButtonContainer>
                        <FaFire color="#616e7c" size={20} />
                        <FeaturesContent isTheme={isDarkTheme}>
                          Trending
                        </FeaturesContent>
                      </FeaturesButtonContainer>
                    </Links>
                  </FeaturesListContainer>

                  <FeaturesListContainer>
                    <Links to="/gaming">
                      <FeaturesButtonContainer>
                        <SiYoutubegaming color="#616e7c" size={20} />
                        <FeaturesContent isTheme={isDarkTheme}>
                          Gaming
                        </FeaturesContent>
                      </FeaturesButtonContainer>
                    </Links>
                  </FeaturesListContainer>

                  <FeaturesListContainer>
                    <Links to="/saved-videos">
                      <FeaturesButtonContainer>
                        <RiMenuUnfoldFill color="#616e7c" size={20} />
                        <FeaturesContent isTheme={isDarkTheme}>
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
              {notFoundVideosView()}
            </VideoResponsiveContainer>
          </HomeFlexContainer>
        </HomeContainer>
      )
    }}
  </AppContext.Consumer>
)

export default NotFound
