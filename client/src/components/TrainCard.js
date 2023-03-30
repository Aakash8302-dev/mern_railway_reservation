import React from 'react'
import Paper from "@mui/material/Paper"
import { Grid } from '@mui/material'
import Box from '@mui/material/Box'

const style = {
    root:{
        margin: "1.5rem 0",
        padding: "2rem 1rem"
    },
    itenary:{
        display: 'flex',
        justifyContent: 'space-around'
    },
    tickets:{
        display: 'flex'
    },
    seatsGreen:{
        padding: '0.8rem',
        margin: '1rem 0.8rem',
        border: 'solid 1px rgba(85,155,9,.4)',
        borderRadius: '5px',
        backgroundColor: 'rgba(85,155,9,0.1)',
        width: 'fit-content',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    seatsYellow:{
        padding: '0.8rem', 
        margin: '1rem 0.8rem',
        border: 'solid 1px rgba(250, 156, 5, 0.6)',
        backgroundColor: 'rgba(250, 156, 5, 0.1)',
        borderRadius: '5px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    seatsRed:{
        padding: '0.8rem',
        margin: '1rem 0.8rem',
        border: 'solid 1px rgba(237, 14, 14, 0.4)',
        backgroundColor: 'rgba(rgba(237, 14, 14, 0.1)',
        borderRadius: '5px',
        width: 'fit-content',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    price:{
        textAlign: 'right'
    }
}

const SeatAvailability = ({availability, total, classes, price}) => {
    return(
        <Box style={ (availability*100)/total> 0 ? {...style.seatsGreen} : {...style.seatsYellow}}>
            <Box>  {classes} <span style={{marginLeft:'5px'}}>₹{ classes === "3A" ? price*2 : classes === "2A" ? price * 3 : classes === "1A" ? price*4 : classes === "SL" ? price : null }</span></Box>
            <Box>{availability>0? `AVL ${availability}` : `WL ${Math.floor(Math.random() * 100) + 1}`}</Box>
        </Box>
    )
}

const TrainCard = ({route}) => {


  return (
    <Paper sx={{...style.root}} elevation={2}>
        <Grid container style={{borderBottom: 'solid 0.5px rgb(212, 212, 212)', paddingBottom: '0.5rem  '}}>
            <Grid item xs={12} sm={12} md={5} style={{color: '#EC5B24'}}>
                {route.trainId} <b>{route.train.toUpperCase()}</b>
            </Grid>
            <Grid item xs={12} sm={12} md={7} sx={{...style.itenary}}>
                <Box>
                    <Box style={{color: '#EC5B24'}}>
                        <b>{route.from.charAt(0).toUpperCase() + route.from.slice(1)}</b>
                    </Box>
                    <Box>
                        { ("0" +new Date(route.depature).getUTCHours()).slice(-2) + ":" + ("0" + new Date(route.depature).getUTCMinutes()).slice(-2) }
                    </Box>
                </Box>
                <Box>
                    <Box>{route.time.split(":")[0] + "hr" + " " + route.time.split(":")[1] + "min"}</Box>
                    <Box>{`${route.distance} km`}</Box>
                </Box>
                <Box>
                    <Box style={{color: '#EC5B24'}}>
                        <b>{route.to.charAt(0).toUpperCase() + route.to.slice(1)}</b>
                    </Box>
                    <Box>
                        {("0" + new Date(route.arrival).getUTCHours()).slice(-2) +  ":" + ("0" +new Date(route.arrival).getUTCMinutes()).slice(-2) }
                    </Box>
                </Box>
            </Grid>
        </Grid>
        <Grid container style={{...style.tickets}}> 
            {
                route.seats.map((seat, index) => (
                    <Grid item xs={6} sm={2}>
                        <SeatAvailability key={index} classes={seat.class} availability={seat.availability} total={seat.total} price={route.price} />
                    </Grid>
                ))
            }
        </Grid>

    </Paper>
  )
}

export default TrainCard