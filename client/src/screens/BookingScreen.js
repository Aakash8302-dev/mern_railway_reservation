import React,{useState,useEffect} from 'react'
import { Box } from '@mui/material'
import SearchTrain from '../components/SearchTrain'
import Button from '@mui/material/Button'
import TrainCard from '../components/TrainCard'
import Container from "@mui/material/Container"
import { useDispatch, useSelector } from 'react-redux'
import { findStops } from '../features/train'
import Loader from '../components/Loader'
import InfoIcon from '@mui/icons-material/Info';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Notify from '../components/Notify'

const style = {
    noRoutes:{
        marginTop:"20%", 
        textAlign:'center',
        fontSize: '1.5rem'
    }
}

const BookingScreen = () => {

const [sorted, setSorted] = useState(false)

const [notify, setNotify] = useState({   
    isOpen: false,
    severity: '',
    message: ''
})

const [sortOrder, setSortOrder] = useState("")

const dispatch = useDispatch()
const routes = useSelector(state => state.train.routes)
const stops = useSelector(state => state.train.stops)

// const [sortedRoutes, setSortedRoutes] = useState(routes && routes.data ?  routes.data : null)

useEffect(()=>{
    dispatch(findStops());
},[])

const handleSort = () => {
    // setSortedRoutes(sortedRoutes && sortedRoutes.slice().sort((a, b) => a.price- b.price))
    setSorted(!sorted)
}

const handleNotify = (severity, message) => {
    setNotify({
        isOpen: true,
        severity,
        message
    })
}

const sortArr = (arr) => {

    if(sortOrder === 'as'){
        arr.sort((a,b) => a.price - b.price)
    }else{
        arr.sort((a,b) => b.price - a.price)
    }
    
    return arr
}

  return (
    <Box>
        {
            stops && stops.length>0 ? <>
                 <SearchTrain />
                   
                    <Box style={{padding: '0 2rem'}}>
                    {   
                        routes && routes.data && routes.data.length> 0 ? 
                        <>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <FormControl sx={{display: 'flex'}}>
                            <FormLabel id="demo-row-radio-buttons-group-label">Sort Price By</FormLabel>
                                <RadioGroup
                                    row
                                    onChange={(e) =>{ setSortOrder(e.target.value)}}
                                    name="row-radio-buttons-group"
                                >
                                <FormControlLabel value="as" control={<Radio />} label="Low to High" />
                                <FormControlLabel value="ds" control={<Radio />} label="High to Low" />
                            </RadioGroup>
                            </FormControl>
                            </Box>

                           { 
                            sortOrder ? sortArr(routes.data.slice()).map((route,index) => (
                                <TrainCard 
                                    key ={index}
                                    route={route}
                                />
                            )): routes.data.map((route, index) => (
                                <TrainCard 
                                    key ={index}
                                    route={route}
                                />
                            ))
                            }
                        </>
                        : routes && routes.status === 'error' ? <Box sx={{...style.noRoutes}}>
                            <div><InfoIcon style={{fontSize: '3rem'}} /></div>
                            No Routes Found
                        </Box> : <></>
                    }
                    </Box>
            </> : <><Loader /></>
        }
       
    </Box>
  )
}

export default BookingScreen