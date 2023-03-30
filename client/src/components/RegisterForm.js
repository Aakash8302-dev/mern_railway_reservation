import React,{useState,useEffect} from 'react'
import { Grid, TextField, Box, styled, MenuItem, FormHelperText, Button, Typography, Container, InputAdornment, InputLabel, FormControl, OutlinedInput, IconButton } from '@mui/material'
import { useForm, Form } from './useForm'
import { useDispatch, useSelector } from 'react-redux'
import { userRegister } from '../features/user'
import Notify from '../components/Notify'
import { Link, useNavigate } from 'react-router-dom'
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
        flexDirection: 'column',
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
    name: '',
    password : '',
    confirmPassword: ''
}


const RegisterForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const registerStatus = useSelector(state => state.user)

    const [showPassword, setShowPassword] = useState(true);
    const [notify, setNotify ] = useState({
        isOpen: false,
        severity: '',
        message: ''
    })

    useEffect(()=>{
        if(registerStatus.status === "ok"){
            setNotify({
                isOpen: true,
                severity: 'success',
                message: 'User Registered !'
            })
            navigate('/auth?screen=login')
        }else if(registerStatus.status === "error"){
            setNotify({
                isOpen: true,
                severity: 'error',
                message: registerStatus.error
            })
        }
    },[registerStatus])

    //Checks if user Logged In and updates state

    // Validates the username and password valuess
    const validate = () => {
        let temp = {}
        temp.username = (/^[a-z0-9]+$/i.test(values.username)) ? "" : "Enter valid username"
        temp.name = (/^[a-z|A-Z]+$/i.test(values.name)) ? "" : "Enter a valid name"
        temp.password = values.password ? "" : "Enter valid password"
        temp.confirmPassword = values.confirmPassword === values.password ? "" : "Passwords do not match"

        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)

    // Method handles Login 
    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if(validate(values)){
            dispatch(userRegister(values))
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
                <TextField
                    variant="outlined"
                    label='Name'
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                    {...(errors ? { error: (errors.name ? true : false), helperText: errors.name } : false)}
                />
                <FormControl variant='outlined'>
                    <TextField
                        type={showPassword ? 'password' : 'text'}
                        value={values.password}
                        variant="outlined"
                        name="password"
                        onChange={handleInputChange}
                        {...(errors ? { error: (errors.password ? true : false), helperText: errors.password } : false)}
                        label='Password'
                    />
                    <TextField
                        type={showPassword ? 'password' : 'text'}
                        value={values.confirmPassword}
                        variant="outlined"
                        name="confirmPassword"
                        onChange={handleInputChange}
                        {...(errors ? { error: (errors.confirmPassword ? true : false), helperText: errors.confirmPassword } : false)}
                        label='Confirm Password'
                    />
                </FormControl>
                <Button type="submit" variant="contained">Register</Button>
                <Box style={{marginTop: '1rem'}}>Already a User?<Link to={'/auth?screen=login'}>Login</Link> </Box>
            </Item>
        </Grid>
    </Container>
</Form>
  )
}

export default RegisterForm