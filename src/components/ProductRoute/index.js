import {Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProductRoute = props => {
  const getToken = Cookies.get('jwt_token')
  if (getToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProductRoute
