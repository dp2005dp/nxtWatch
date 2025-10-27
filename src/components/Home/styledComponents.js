import {Link} from 'react-router-dom'
import {FaMoon} from 'react-icons/fa'
import {IoIosSunny, IoMdMenu} from 'react-icons/io'
import styled from 'styled-components'

export const HomeContainer = styled.div`
  height: 100vh;
  background-color: ${props => (props.isTheme ? '#f9f9f9' : '#181818')};
  display: flex;
  flex-direction: column;
`
export const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

`
export const HomeLogo = styled.img`
   height: 30px;
   width: 150px;

     @media screen and (max-width: 576px){
         height: 30px;
         width: 100px;
    }

`

export const LogoutContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const ThemButton = styled.button`
  background-color: transparent;
  border-width: 0px;
  cursor: pointer;
`
export const Profile = styled.img`
  height: 30px;
  width: 30px;
  margin-left: 40px;
  margin-right: 20px;

  @media screen and (max-width: 576px){
     display : none ;
    }
`
export const LogoutButton = styled.button`
  height: 35px;
  width: 100px;
  background-color: transparent;
  color: ${props => (props.isTheme ? '#3b82f6' : '#f9f9f9')};
  font-family: 'Roboto';
  font-size: 15px;
  border: 2px solid ${props => (props.isTheme ? '#3b82f6' : '#f9f9f9')};;
  cursor: pointer;
  margin-right: 20px;
  margin-left: 20px;
  
   @media screen and (max-width: 576px){
        display : none;
    }

`
export const MobileLogoutButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border-width : 0px;
   @media screen and (min-width: 577px){
        display : none;
    }

`

export const HomeFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`
export const SideBarContainer = styled.div`
  height: 100%;
  width: 250px;
  background-color: ${props => (props.isTheme ? '#f9f9f9' : '#181818')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;

   @media screen and (max-width: 576px){
        display : none;
    }
`
export const FeaturesMainContainer = styled.ul`
  padding: 0px;
  margin: 0px;

   @media screen and (max-width: 576px){
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }


`

export const FeaturesListContainer = styled.li`
  height: 40px;
  width: 250px;
  list-style-type: none;
`
export const FeaturesButtonContainer = styled.button`
  height: 40px;
  width: 250px;
  background-color: ${props => {
    if (props.isTheme) {
      return props.isActiveTab ? '#d7dfe9' : 'transparent'
    }
    return props.isActiveTab ? '#313131' : 'transparent'
  }};
  border-width: 0px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const FeaturesContent = styled.p`
  color: ${props => (props.isTheme ? '#7e858e' : '#f1f5f9')};
  font-family: 'Roboto';
  font-size: 20px;
  font-weight:${props => (props.isActiveTab ? 'bold' : '400')};
  margin-left: 15px;
`
export const ContactContent = styled.p`
  color: ${props => (props.isTheme ? '#475569' : '#f9f9f9')};
  font-family: 'Roboto';
  font-size: 20px;
`
export const ContactIconsContainer = styled.div`
  width: 150px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const ContactIcons = styled.img`
  height: 35px;
  width: 35px;
`
export const VideoResponsiveContainer = styled.div`
   width: 100%;
   background-color: ${props => (props.isTheme ? '#f4f4f4' : '#0f0f0f')};
   padding: 20px;
`
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const SearchInputContainer = styled.input`
  height: 40px;
  width: 500px;
  background-color: ${props => (props.isTheme ? '#ffffff' : '#0f0f0f')};
  color: ${props => (props.isTheme ? '#1e293b' : '#e2e8f0')};
  font-family: 'Roboto';
  font-size: 20px;
  border: 1px solid ${props => (props.isTheme ? '#cccccc' : '#7e858e')};
  outline: none;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 30px;


  @media screen and (max-width: 576px){
      height: 30px;
      width: 200px;
      padding: 10px;
        
    }

    @media screen and (width: 768px){
      width: 350px;
        
    }
`
export const SearchIconContainer = styled.button`
  height: 40px;
  width: 60px;
  cursor: pointer;
  background-color: ${props => (props.isTheme ? '#ebebeb' : '#181818')};
  border: 1px solid ${props => (props.isTheme ? '#cccccc' : '#7e858e')};
  border-left: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 30px;


   @media screen and (max-width: 576px){
      height: 30px;
      width: 50px;
        
    }

    @media screen and (max-width: 576px){
      width: 50px;
        
    }
`

export const VideosMainContainer = styled.ul`
  height : 70vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  padding: 20px;
  margin: 0px;

   @media screen and (max-width: 576px){
      padding: 20px;
      margin-left:50px;
    }
`
export const VideosListContainer = styled.li`
  list-style-type: none;
  height: 500px;
  width: 300px;
  margin-left: 0px;
  margin-right: 10px;
  margin-bottom: 10px;

  @media screen and (max-width: 576px){
      height: 400px;
      width: 250px;
      margin-right: 5px;
      margin-bottom: 5px;

    }
`
export const VideosImage = styled.img`
  height: 250px;
  width: 300px;

  @media screen and (max-width: 576px){
      height: 200px;
      width: 250px;
        
    }
`
export const VideosDeatailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 15px;
`
export const VideosProfileImage = styled.img`
  height: 50px;
  width: 50px;

  @media screen and (max-width: 576px){
      height: 40px;
      width: 40px;
        
    }
`
export const VideosViewsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 15px;
`
export const VideoTitle = styled.p`
  color: ${props => (props.isTheme ? '#7e858e' : '#f9f9f9')};
  font-family: 'Roboto';
  font-size: 18px;
  margin-left: 10px;

  @media screen and (max-width: 576px){
      font-size: 14px;
        
    }
`
export const VideoTDetails = styled.p`
  color: ${props => (props.isTheme ? '#64748b' : '#cbd5e1')};
  font-family: 'Roboto';
  font-size: 18px;
  margin-top: 1px;
  margin-bottom: 0px;
  margin-left: 10px;

   @media screen and (max-width: 576px){
      font-size: 14px;
        
    }
`
export const Links = styled(Link)`
  text-decoration: none;
  color: inherit;
`
export const PopupConatiner = styled.div`
  background-color: ${props => (props.isTheme ? '#ffffff' : '#313131')};
  box-shadow: 0px 4px 16px ${props =>
    props.isTheme ? '#bfbfbfbf' : '#181818'};
  height: 200px;
  width: 400px;
   border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 576px){
     height: 100vh;
     width: 100vw;     
    }
`
export const PopupContent = styled.p`
  color:${props => (props.isTheme ? '#000000' : '#f4f4f4')};
  font-family: 'Roboto';
  font-size: 20px;

   @media screen and (max-width: 576px){
     font-size: 15px;     
    }
`
export const CancelButton = styled.button`
  height: 40px;
  width: 120px;
  background-color: transparent;
  color: #475569;
  font-family: 'Roboto';
  font-size: 15px;
  border-radius: 5px;
  border: 2px solid #475569;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
`
export const ConfirmButton = styled.button`
  height: 40px;
  width: 120px;
  background-color: #3b82f6;
  color: #ebebeb;
  font-family: 'Roboto';
  font-size: 15px;
  border-radius: 5px;
  border-width: 0px;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
`
export const LogoutFlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const UiResponsiveContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const FailureImage = styled.img`
  height: 300px;
  width: 300px;

    @media screen and (max-width: 576px){
      height: 180px;
      width: 180px;
    }
`
export const FailureMessage = styled.h1`
  color:${props => (props.isTheme ? '#0f0f0f' : '#ffffff')} ;
  font-family: 'Roboto';
  font-size: 24px;

  @media screen and (max-width: 576px){
     font-size: 20px;
    }
`
export const FailureDescripition = styled.p`
  color: ${props => (props.isTheme ? '#475569' : '#cbd5e1')};
  font-family: 'Roboto';
  font-size: 20px;
  text-align : center ;

  @media screen and (max-width: 576px){
     font-size: 15px;
    }
`
export const FailureButton = styled.button`
  height: 40px;
  width: 100px;
  background-color: #00306e;
  color:  #ffffff;
  font-family: 'Roboto';
  font-size: 15px;
  border-radius: 5px;
  border-width: 0px;
  cursor: pointer;

  @media screen and (max-width: 576px){
     height: 30px;
     width: 80px;
    }
`
export const BannerContainer = styled.div`
  height: 250px;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  padding: 15px;
`
export const BannerCloseContainer = styled.button`
  width : 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: transparent;
  border-width: 0px;
  cursor: pointer; 
`
export const BannerLogo = styled.img`
  height: 30px;
  width: 80px;
  margin-top: 20px;
`
export const BannerContent = styled.p`
  color: #181818;
  font-family: 'Roboto';
  font-size: 18px;
 
`
export const BannerButton = styled.button`
  height: 35px;
  width: 120px;
  background-color: transparent;
  color: #181818;
  font-family: 'Roboto';
  font-size: 15px;
  border: 2px solid #181818;
  cursor: pointer;
`

export const SunLogo = styled(IoIosSunny)`
    font-size: 35px;
   color: ${props => (props.isTheme ? '#000000' : '#ffffff')};
     
     @media screen and (max-width: 576px){
          font-size: 25px;
        
    }
`
export const MoonLogo = styled(FaMoon)`
    font-size: 30px;
   color: ${props => (props.isTheme ? '#000000' : '#ffffff')};

     @media screen and (max-width: 576px){
        font-size: 20px; 
    }

`
export const MenuLogo = styled(IoMdMenu)`
    font-size: 28px;
    color: ${props => (props.isTheme ? '#000000' : '#ffffff')};
    margin-left: 20px;
    margin-right: 20px;
    
     @media screen and (min-width: 577px){
        display : none; 
    }
`
export const MenuCloseContainer = styled.div`
  width : 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  cursor: pointer; 
  padding : 20px;
  margin-top : 50px;
`

export const MobileFeaturesPopContainer = styled.div`
        height: 100vh;
        width: 100vw;
        background-color: ${props => (props.isTheme ? '#f4f4f4' : '#181818')};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

      @media screen and (min-width: 577px){
          display : none;
       }
`
