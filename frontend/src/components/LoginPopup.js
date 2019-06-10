import React from 'react'
import Popper from '@material-ui/core/Popper'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}))

function LoginPopup(props) {
  const classes = useStyles()
  const endpoint = '/login'
  const [anchorEl,  setAnchorEl] = React.useState(null)

  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'login-popper' : null

  return (
    <div>
      <Button variant='contained' onClick={handleClick}>
        Log in
      </Button>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography className={classes.typography}>
                Log in
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  )
}

export default LoginPopup