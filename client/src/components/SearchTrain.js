import React,{useEffect, useState} from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import SwapHorizontalCircleOutlinedIcon from '@mui/icons-material/SwapHorizontalCircleOutlined';
import { useForm } from './useForm'
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux'
import {trainSearch} from '../features/train'
import { findStops } from '../features/train'
import { useNavigate, useSearchParams } from 'react-router-dom'

const style = {
    homeRoot:{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: "white",
        width: '90vw',
        height: 'fit-content',
        padding: '1rem',
        borderRadius: '10px',
        margin: '4rem 0'
    },
    searchRoot:{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: "#dedcdc",
        height: 'fit-content',
        padding: '1rem',
    },
    searchBtn:{
        width: '20ch',
        padding: '16px 16px',
        height: 'fit-content'
    },
    textField: {
        padding: '8px 0',
        margin: '0 10px',
        marginTop: '8px',
        width: '30ch'
    },
    searchWrap:{
        display: 'flex',
        justifyContent: 'center',
    },
    searchBtnWrap:{
        marginLeft: 'auto', 
        display:'flex', 
        justifyContent: 'flex-end',
        '@media(max-width: 780px)': {
            justifyContent: 'center'
        }
    }
}

let initialValues ={
    from: '',
    to: '',
    date: ''
}

const SearchTrain = ({screen}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stops = useSelector(state => state.train.stops)

  const [from,setFrom] = useState(getParameterByName("fromStation"))
  const [to, setTo] = useState(getParameterByName("toStation"))

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)

  const validate = () => {
    let temp = {}
    temp.from = (/^[a-z|A-Z]+$/i.test(values.from)) ? "" : "Enter valid Starting Place"
    temp.to = (/^[a-z|A-Z]+$/i.test(values.name)) ? "" : "Enter valid to"

    setErrors({
        ...temp
    })

    return Object.values(temp).every(x => x === "")
}

const handleSearch = () => {
    dispatch(trainSearch({from,to}))
    navigate(`/trains?fromStation=${from}&toStation=${to}`)
}

const swapLocation = () => {
   setFrom(stops[10])
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

  return (
    <Grid container sx={ screen === "home" ?{...style.homeRoot} : {...style.searchRoot} }>
        <Grid item sx={{...style.searchWrap}} xs={12} sm={12} md={3}>
        <Autocomplete 
            disablePortal
            id="search-from"
            options={stops}
            value={from}
            name='from' 
            onChange={(event,value) => setFrom(value)}
            renderInput={(params) => <TextField 
                variant='filled' {...params} 
                label="Leaving From" 
                sx={{...style.textField}}
            />}    
        />
        </Grid>
        <Grid item xs={12} sm={12} md={1} style={{display:'flex',justifyContent:'center'}}>
            <IconButton onClick={swapLocation}>
                <SwapHorizontalCircleOutlinedIcon />
            </IconButton>
        </Grid>
        <Grid item sx={{...style.searchWrap}} xs={12} sm={12} md={3}>
        <Autocomplete 
            disablePortal
            id="search-to"  
            options={stops}
            value={to}
            onChange={(event,value) => setTo(value)}
            renderInput={(params) => <TextField 
                variant='filled' {...params} 
                label="Going to" 
                sx={{...style.textField}}
            />}    
        />
        </Grid>
        <Grid item style={{marginLeft: 'auto', display:'flex', justifyContent: 'flex-end'}} xs={12} sm={12}  md={5}>
            <Button sx={{...style.searchBtn}} variant="contained" onClick={handleSearch} >SEARCH</Button>
        </Grid>
    </Grid>
  )
}

export default SearchTrain