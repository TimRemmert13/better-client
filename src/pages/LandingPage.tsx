import React, { useContext } from 'react'
import {
  makeStyles,
  createStyles,
  Theme,
  Button,
  Modal,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Logo from './../../public/assets/logo.svg'
import { UserStoreContext } from '../stores/UserStore'
import { useForm } from 'react-hook-form'
import { ILoginDto } from '../models/dtos/UserDtos'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
      borderRadius: 10,
    },
  })
)

const LandingPage = () => {
  const [modelStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)
  const userStore = useContext(UserStoreContext)
  const { user, login } = userStore

  const { register, handleSubmit, errors } = useForm<ILoginDto>()

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const classes = useStyles()

  const handleLoginRequest = (input: ILoginDto) => {
    login(input)
  }

  const form = (
    <div style={modelStyle} className={classes.paper}>
      <form onSubmit={handleSubmit(handleLoginRequest)}>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
          spacing={5}
        >
          <Grid item>
            <img width="200" height="200" src={Logo} />
          </Grid>
          <Grid item>
            <Typography variant="h6" align="center" color="primary">
              Get Better.
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              name="username"
              label="username"
              inputRef={register({ required: 'username is required' })}
              error={!!errors.username}
            />
          </Grid>
          <Grid item>
            {errors.username && (
              <Alert severity="error">{errors.username.message}</Alert>
            )}
          </Grid>
          <Grid item>
            <TextField
              name="password"
              label="password"
              type="password"
              inputRef={register({
                required: 'password is required',
                minLength: {
                  value: 8,
                  message: 'password minimum length 8 characters',
                },
              })}
              error={!!errors.password}
            />
          </Grid>
          <Grid item>
            {errors.password && (
              <Alert severity="error">{errors.password.message}</Alert>
            )}
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {form}
      </Modal>
    </div>
  )
}

export default LandingPage
