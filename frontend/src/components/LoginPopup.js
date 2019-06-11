import React from 'react'
import clsx from 'clsx'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Popper from '@material-ui/core/Popper'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { ClickAwayListener } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  popper: {
    width: 250
  },
  typography: {
    padding: theme.spacing(2)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  whiteText: {
    color: '#fff'
  }
}))

function LoginPopup(props) {
  const classes = useStyles()
  const endpoint = '/rest-auth/login/'
  const [anchorEl,  setAnchorEl] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  const [values, setValues] = React.useState({
    username: '',
    password: ''
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  function handleClickAway() {
    setAnchorEl(null)
  }

  function captureEnter() {
    if (window.event.keyCode === 13) {
      submitForm()
    }
  }

  function submitForm() {
    setStatus('loading')
    axios.post(endpoint, values)
      .then(res => {
        if ('key' in res.data) {
          setStatus('success')
          console.log('Login successful')
          handleClickAway()
          window.location.reload()
        }
    })
      .catch(error => {
        setStatus('invalid-credentials')
        console.log('Invalid credentials')
      })
  }

  const open = Boolean(anchorEl)
  const id = open ? 'login-popper' : null

  return (
    <div>
      <Button variant='text' onClick={handleClick} className={classes.whiteText}>
        Log in
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} className={classes.popper} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={16}>
                <Grid container justify='center' spacing={1}>
                  <form className={classes.container} onKeyDown={captureEnter}>
                    <Grid item>
                      <Typography variant='h5' className={classes.typography}>
                        Log in
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        id='username'
                        label='Username or e-mail'
                        className={classes.textField}
                        value={values.username}
                        onChange={handleChange('username')}
                        margin='normal'
                        error={status === 'invalid-credentials'}
                        variant='outlined' />
                    </Grid>
                    <Grid item>
                      <TextField
                        id='password'
                        label='Password'
                        className={classes.textField}
                        value={values.password}
                        onChange={handleChange('password')}
                        type='password'
                        margin='normal'
                        error={status === 'invalid-credentials'}
                        variant='outlined' />
                    </Grid>
                    <Grid item>
                      <Button onClick={submitForm} variant='contained' color='primary' className={classes.submit}>
                        Log in
                      </Button>
                      { status === 'invalid-credentials' ?
                        <Typography className={classes.typography}>Invalid credentials</Typography>
                        :
                      ''
                      }
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  )
}

export default LoginPopup