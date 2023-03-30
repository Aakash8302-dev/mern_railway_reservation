import React,{useState,useEffect} from 'react'
import { Grid, TextField, Box, styled, MenuItem, FormHelperText, Button, Typography, Container, InputAdornment, InputLabel, FormControl, OutlinedInput, IconButton } from '@mui/material'
import { useForm, Form } from './useForm'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/user'
import Notify from './Notify'
import axios from 'axios'

const Item = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': { margin: '0.4rem', width: '35ch' }

}))


const style = {
    root: {
        textAlign: 'center',
        height: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

const initialValues = {
    username : '',
    password : ''
}


const LoginForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userLoginStatus = useSelector(state => state.user)

    const [showPassword, setShowPassword] = useState(true);
    const [login, setLogin] = useState(false)
    const [notify, setNotify] = useState({
        isOpen: false,
        severity: '',
        message: ''
    })

    useEffect(()=>{

        if(userLoginStatus.status === "ok"){
            setNotify({
                isOpen: true,
                severity: 'success',
                message: `Welcome ${userLoginStatus.userLoggedIn.name}`
            })
        }else if(userLoginStatus.status === "error"){
            setNotify({
                isOpen: true,
                severity: 'error',
                message: userLoginStatus.error
            })
        }

    },[userLoginStatus])

    // Validates the username and password valuess
    const validate = () => {
        let temp = {}
        temp.username = (/^[a-z0-9]+$/i.test(values.username)) ? "" : "Enter valid username"
        temp.password = values.password ? "" : "Enter valid password"

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)

    // Method handles Login 
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(validate(values)){
            dispatch(userLogin(values))
        }
    }

  return (
    <Form onSubmit={handleSubmit}>
    <Notify notify={notify} setNotify={setNotify} />
    <Container sx={{ ...style.root }} >
        <Grid item sx={{ ...style.formWrap }}>
            <Item>
                <TextField
                    variant="outlined"
                    label='Username'
                    name="username"
                    value={values.username}
                    onChange={handleInputChange}
                    {...(errors ? { error: (errors.username ? true : false), helperText: errors.username } : false)}
                />
                <FormControl variant='outlined'>
                    <TextField
                        id='outlined-adornment-password'
                        type={showPassword ? 'password' : 'text'}
                        value={values.password}
                        variant="outlined"
                        name="password"
                        onChange={handleInputChange}
                        {...(errors ? { error: (errors.password ? true : false), helperText: errors.password } : false)}
                        label='Password'
                    />
                </FormControl>
                <Button type="submit" variant="contained">Submit</Button>
                <Box style={{marginTop: '1rem'}}>Not a User?<Link to={'/auth?screen=register'}>Register</Link> </Box>
            </Item>
    
        </Grid>
        
    </Container>
</Form>
  )
}

export default LoginForm