import styled from 'styled-components'

export const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.isTheme ? '#f9f9f9' : '#0f0f0f')};
`
export const LoginCardContainer = styled.div`
  height: 500px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  border-width: 0px;
  box-shadow: 0px 4px 16px 0px #bfbfbfbf;
  background-color: ${props => (props.isTheme ? '#f9f9f9' : '#181818')};

   @media screen and (max-width: 576px){
     height: 400px;
     width: 250px;
  }
`
export const Logo = styled.img`
  height: 50px;
  width: 200px;
  margin-bottom: 50px;

   @media screen and (max-width: 576px) {
     height: 35px;
     width: 100px;
      margin-bottom: 30px;
  }
`
export const Label = styled.label`
   color: ${props => (props.isTheme ? '#64748b' : '#f9f9f9')};
   font-family: "Roboto";
   font-size: 18px;
   font-weight : bold;

   @media screen and (max-width: 576px) {
     font-size: 15px;
  }
  `
export const Input = styled.input`
   height: 40px;
   width: 300px;
   padding: 20px;
   background-color: ${props => (props.isTheme ? '#f9f9f9' : '#0f0f0f')};
   color: ${props => (props.isTheme ? '#1e293b' : '#f9f9f9')};
   font-family: "Roboto";
   font-size: 15px;
   border-radius: 5px;
   border:  2px solid ${props => (props.isTheme ? '#ebebeb' : '#1e293b')};;
   outline: none;
   margin-top: 10px;

    @media screen and (max-width: 576px) {
      height: 30px;
      width: 200px;
      padding: 10px;
  }
  `
export const Checkbox = styled.input`
   height: 18px;
   width: 18px;
   border: 1px solid #94a3b8;
   background-color: ${props => (props.isTheme ? 'transparent' : '#f9f9f9')};
  `

export const LoginButton = styled.button`
    height: 40px;
    width: 300px;
    background-color: #3b82f6;
    color: #ffffff;
    font-family: "Roboto";
    font-size: 15px;
    border-radius: 5px;
    border-width: 0px;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
 
 @media screen and (max-width: 576px) {
      height: 30px;
      width: 200px;
  }
  `
export const Margin = styled.div`
   margin-top: 15px;
   margin-bottom: 15px;
  `
export const LoginFailedMessage = styled.p`
  color: #ff0b37;
  font-family: 'Roboto';
  font-size: 15px;
  `