import React,{useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthScreen = () => {

  const navigate = useNavigate();

  const [qParams] = useSearchParams();
  let screen = qParams.get("screen");

  const userLoginStatus = useSelector(state => state.user)

  useEffect(()=>{
    if(userLoginStatus.userLoggedIn && userLoginStatus.userLoggedIn.token){
        navigate('/')
    }
    },[userLoginStatus])

  const renderComponent = (param) => {
    switch(param){
      case 'register':
        return <RegisterForm />
      case 'login':
        return <LoginForm />
      default:
        return <>Div not found</>
    }
  }

  return (
    <React.Fragment>
      {
        screen && renderComponent(screen)
      }
    </React.Fragment>
  )
}

export default AuthScreen