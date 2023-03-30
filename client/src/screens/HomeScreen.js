import React,{useEffect} from 'react'
import Box from "@mui/material/Box"
import { useDispatch, useSelector } from 'react-redux'
import trainBackground from '../assets/trainBackground.jpeg'
import SearchTrain from '../components/SearchTrain'
import { findStops } from '../features/train'
import Loader from '../components/Loader'

let style ={
  root:{
    height: '50vh',
    backgroundImage: `url(${trainBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

}

const HomeScreen = () => {

  const dispatch = useDispatch();

  const stopsStatus = useSelector(state => state.train.status)

  useEffect(()=>{
    dispatch(findStops())
  },[])

  return (
      <Box sx={{...style.root}}>
        {
          stopsStatus === 'ok' ?  <SearchTrain screen={"home"} /> : <Loader />
        }
         
      </Box>
  )
}

export default HomeScreen